const Books = require('../models/Book')

const createQueryObject = async (search, book) => {
  let queryObject = []
  if (search) {
    search = search.replace(/[+]/g, '\\W')
    queryObject.push({ book: { $regex: search, $options: 'i' } })
    queryObject.push({ author: { $regex: search, $options: 'i' } })
    queryObject.push({ category: { $regex: search, $options: 'i' } })
    if (Number(search)) {
      queryObject.push({ isbn: Number(search) })
    }
  }
  if (book) {
    queryObject.push({ book: { $eq: `${book}` } })
  }
  return queryObject
}

const getSimilarBooks = async (result) => {
  const { book, category } = (await result.clone())[0]
  const similarQuery = [{ book: { $ne: `${book}` } }, { category: { $eq: `${category}` } }]
  const similarBooks = await Books.find({ $and: similarQuery })
  return similarBooks
}

const sortBooks = async (result, sort) => {
  const sortList = sort.split(',').join(' ')
  result = result.sort(sortList)
  return [true, result]
}

const calcTotalBooks = async (result, limit, resultLength) => {
  const totalBooks = await result.clone().countDocuments()
  const totalPages = Math.ceil(totalBooks / limit)
  if (!resultLength) {
    const latest = (await Books.find().sort({ "dateAdded": -1 }))[0]
    return [totalBooks, totalPages, latest]
  }
  return [totalBooks, totalPages]

}

const calcMisc = async (pageNum, limitNum) => {
  const page = Number(pageNum) || 1
  const limit = Number(limitNum) || 20
  const skip = (page - 1) * limit
  return [page, limit, skip]
}

const getBooks = async (req, res) => {
  try {

    const queryObject = await createQueryObject(req.query.search, req.query.book)

    let result = queryObject.length !== 0 ? Books.find({ $or: queryObject }) : Books.find()

    result = req.query.sort ? (await sortBooks(result, req.query.sort))[1] : result

    const similarBooks = req.query.book ? await getSimilarBooks(result) : undefined

    const [page, limit, skip] = await calcMisc(req.query.page, req.query.limit)

    const [totalBooks, totalPages, latest] = await calcTotalBooks(result, limit, queryObject.length)

    result = result.skip(skip).limit(limit)
    const books = await result

    if (books.length > 0) {
      return res.status(200).send({
        total: totalBooks, total_pages: totalPages,
        page: page, limit_per_page: limit,
        results_in_page: books.length, results: books,
        similar: similarBooks, latest: latest
      })
    }
    res.status(200).send({ total: totalBooks, results_in_page: books.length, msg: 'No books found' })

  } catch (error) {
    res.status(404).send({ msg: 'Error not found' })
    console.log(error)
  }
}

module.exports = {
  getBooks
}

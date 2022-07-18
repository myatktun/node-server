import Books from '../models/Book.js'

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

const calcTotalBooks = async (result, limit, resultLength = 0) => {
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

export const getBooks = async (req, res) => {
  try {

    const queryObject = await createQueryObject(req.query.search, req.query.book)

    let result = queryObject.length !== 0 ? Books.find({ $or: queryObject }) : Books.find()

    result = req.query.sort ? (await sortBooks(result, req.query.sort))[1] : result

    const similarBooks = req.query.book ? await getSimilarBooks(result) : undefined

    const [page, limit, skip] = await calcMisc(req.query.page, req.query.limit)

    const [totalBooks, totalPages, latest] = await calcTotalBooks(result, limit, queryObject.length)

    result = result.skip(skip).limit(limit)
    const books = await result

    if (books.length) {
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

export const getBook = async (req, res) => {
  try {
    const { book } = req.params

    const result = await Books.findOne({ book: book })

    if (result) {
      const similarBooks = await getSimilarBooks(result)
      return res.status(200).send({ results: [result], similar: similarBooks })
    }
    res.status(404).send({ msg: 'Something went wrong' })
  } catch (error) {
    res.status(404).send({ msg: 'Error not found' })
    console.log(error)
  }
}

const queryDB = async (value, limit, skip) => {

  return await Books.aggregate([
    {
      $group: {
        _id: `$${value}`,
        books: { $addToSet: "$book" }
      }
    },
    {
      $sort: { _id: 1 }
    },
    {
      $facet: {
        total: [
          {
            $count: "total"
          }
        ],
        data: [
          {
            $skip: skip
          },
          {
            $limit: limit
          }
        ]
      }
    }
  ])
}

export const getAuthors = async (req, res) => {
  try {
    const [page, limit, skip] = await calcMisc(req.query.page, req.query.limit)

    const [authors] = await queryDB("author", limit, skip)

    const { total, data: author } = authors
    const totalBooks = total[0].total
    const totalPages = Math.ceil(totalBooks / limit)
    if (authors) {
      return res.status(200).send({
        total: totalBooks, total_pages: totalPages,
        page: page, limit_per_page: limit,
        results_in_page: author.length, results: author,
      })
    }
    res.status(404).send({ total: totalBooks, results_in_page: books.length, msg: 'No books found' })

  } catch (error) {
    res.status(404).send({ msg: 'Error not found' })
    console.log(error)
  }
}

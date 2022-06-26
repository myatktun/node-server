const Books = require('../models/Book')

const getBooks = async (req, res) => {
  try {

    const { search, sort } = req.query
    let query = []
    if (search) {
      query.push({ book: { $regex: search, $options: 'i' } })
      query.push({ author: { $regex: search, $options: 'i' } })
      if (Number(search)) {
        query.push({ isbn: Number(search) })
      }
    }
    let result = query.length !== 0 ? Books.find({ $or: query }) : Books.find()

    if (sort) {
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit

    const allBooks = await Books.countDocuments()
    let latest = await Books.find()
    latest = latest[allBooks - 1]
    const totalBooks = await result.clone().countDocuments()
    const totalPages = Math.ceil(totalBooks / limit)

    result = result.skip(skip).limit(limit)
    const books = await result

    if (books.length > 0) {
      return res.status(200).send({ total: totalBooks, total_pages: totalPages, page: page, limit_per_page: limit, results_in_page: books.length, results: books, latest: latest })
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

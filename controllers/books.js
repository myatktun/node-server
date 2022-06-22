const Books = require('../models/Book')

const getBooks = async (req, res) => {
  try {

    const { sort } = req.query

    const totalBooks = await Books.countDocuments()
    let result = Books.find()

    if (sort) {
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const books = await result

    if (books.length > 0) {
      return res.status(200).send({ total: totalBooks, page: page, limit_per_page: limit, results_in_page: books.length, results: books })
    }
    res.status(404).send({ total: totalBooks, results_in_page: books.length, msg: 'No books found' })

  } catch (error) {
    res.status(404).send({ msg: 'Error not found' })
    console.log(error)
  }
}

const searchBooks = async (req, res) => {
  try {
    const { book, sort } = req.query
    const queryObject = {}

    if (book) {
      queryObject.book = { $regex: book, $options: 'i' }
    }
    const totalBooks = await Books.countDocuments()
    let result = Books.find(queryObject)

    if (sort) {
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const books = await result

    if (books.length > 0) {
      return res.status(200).send({ total: totalBooks, page: page, limit_per_page: limit, results_in_page: books.length, results: books })
    }
    res.status(404).send({ total: totalBooks, results_in_page: books.length, msg: 'No books found' })

  } catch (error) {
    res.status(404).send({ msg: 'Error not found' })
    console.log(error)
  }
}


module.exports = {
  getBooks,
  searchBooks
}

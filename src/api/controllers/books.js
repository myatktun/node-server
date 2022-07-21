import { queryDB, getSimilarBooks, calcMisc } from '../helpers/helpers.js'

export const getBooks = async (req, res) => {
  try {
    const [page, limit, skip] = await calcMisc(req.query.page, req.query.limit)

    const [result, latest] = await queryDB('books', limit, skip, req.query.search)
    const { total, data: books } = result

    const totalBooks = total[0].total
    const totalPages = Math.ceil(totalBooks / limit)
    if (books.length) {
      return res.status(200).send({
        total: totalBooks, total_pages: totalPages,
        page: page, limit_per_page: limit,
        results_in_page: books.length, results: books,
        latest: latest
      })
    }
    res.status(404).send({ total: totalAuthors, results_in_page: authors.length, msg: 'No authors found' })

  } catch (error) {
    res.status(404).send({ msg: 'Error not found' })
    console.log(error)
  }
}

export const getBook = async (req, res) => {
  try {
    const { book } = req.params

    const [result] = await queryDB('book', 1, 1, book)

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

export const getAuthors = async (req, res) => {
  try {
    const [page, limit, skip] = await calcMisc(req.query.page, req.query.limit)

    const { total, data: authors } = (await queryDB('author', limit, skip))[0]

    const totalAuthors = total[0].total
    const totalPages = Math.ceil(totalAuthors / limit)
    if (authors.length) {
      return res.status(200).send({
        total: totalAuthors, total_pages: totalPages,
        page: page, limit_per_page: limit,
        results_in_page: authors.length, results: authors,
      })
    }
    res.status(404).send({ total: totalAuthors, results_in_page: authors.length, msg: 'No authors found' })

  } catch (error) {
    res.status(404).send({ msg: 'Error not found' })
    console.log(error)
  }
}

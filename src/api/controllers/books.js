import { queryDB, getSimilarBooks } from '../helpers/helpers.js'

export const getBooks = async (req, res) => {
  try {
    const { result, latest, page, limit } = await queryDB('books', req)
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
    const { result } = await queryDB('book', req)

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
    const { result, page, limit } = await queryDB('author', req)

    const { total, data: authors } = result
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

import createQueryArray from './db.js'
import Books from '../models/Book.js'

const getSimilarBooks = async (result) => {
  const { book, category } = result
  const queryObject = await createQueryArray('similar', 1, 1, book, category)
  return await Books.aggregate(queryObject)
}

const calcMisc = async (query) => {
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 20
  const skip = (page - 1) * limit
  return [page, limit, skip]
}

const queryDB = async (type, req, category) => {
  const [page, limit, skip] = Object.keys(req.query).length ? await calcMisc(req.query) : [1, 1, 1]
  const queryObject = Object.keys(req.query).length
    ? await createQueryArray(type, limit, skip, req.query.search)
    : await createQueryArray(type, limit, skip, req.params.book)
  const [result] = await Books.aggregate(queryObject)
  if (result.latest) {
    return { result, latest: result.latest[0], page, limit }
  }
  return { result, page, limit }
}

export { queryDB, getSimilarBooks }

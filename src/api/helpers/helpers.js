import createQueryObject from './db.js'
import Books from '../models/Book.js'

const getSimilarBooks = async (result) => {
  const { book, category } = result
  const queryObject = await createQueryObject('similar', 1, 1, book, category)
  return await Books.aggregate(queryObject)
}

const calcMisc = async (pageNum, limitNum) => {
  const page = Number(pageNum) || 1
  const limit = Number(limitNum) || 20
  const skip = (page - 1) * limit
  return [page, limit, skip]
}

const queryDB = async (type, limit, skip, search, category) => {
  const queryObject = await createQueryObject(type, limit, skip, search, category)
  const [result] = await Books.aggregate(queryObject)
  if (result.latest) {
    return [result, result.latest[0]]
  }
  return [result, result.latest]
}

export {
  queryDB,
  getSimilarBooks, calcMisc
}

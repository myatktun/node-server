import createQueryArray from './db.js'
import Books from '../models/Book.js'

const calcMisc = async (query) => {
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 20
  const skip = (page - 1) * limit
  return [page, limit, skip]
}

const cleanReq = async (req) => {
  const [page, limit, skip] = Object.keys(req.query).length ? await calcMisc(req.query) : [1, 1, 1]
  const queryObject = await createQueryArray(req, limit, skip)
  return { queryObject, page, limit }
}

const queryDB = async (req) => {
  const { queryObject, page, limit } = await cleanReq(req)
  const result = await Books.aggregate(queryObject)
  return { result, page, limit }
}

export default queryDB

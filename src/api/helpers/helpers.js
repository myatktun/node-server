import createQueryArray from './createQueryArray.js'
import Books from '../models/Book.js'

const calcMisc = async (query) => {
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 20
  const skip = (page - 1) * limit
  return [page, limit, skip]
}

const cleanReq = async (req) => {
  const [page, limit, skip] = await calcMisc(req.query)
  const queryArray = await createQueryArray(req, limit, skip)
  return { queryArray, page, limit }
}

const queryDB = async (req) => {
  const { queryArray, page, limit } = await cleanReq(req)
  const result = await Books.aggregate(queryArray)
  return { result, page, limit }
}

export default queryDB

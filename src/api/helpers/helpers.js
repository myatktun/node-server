import createQueryArray from './createQueryArray.js'
import Books from '../models/Book.js'
import Notes from '../models/Note.js'

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
    if (req.route.path.includes('/books')) {
        const result = await Books.aggregate(queryArray)
        return { result, page, limit }
    }
    const result = await Notes.aggregate(queryArray)
    return { result, page, limit }
}

export const getData = async (req) => {
    const { result, page, limit } = await queryDB(req)
    const { total, data, latest } = result[0]
    const totalResults = total[0] ? total[0].total : 0
    const totalPages = Math.ceil(totalResults / limit)
    return { totalResults, totalPages, page, limit, data, latest }
}

export const updateData = async (req) => {
    await Books.findOneAndUpdate({ book: req.params.book }, req.body, {
        new: true,
        runValidators: true
    })
}

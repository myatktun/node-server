import createQueryArray from "./createQueryArray"
import Books from "../models/Book"
import Notes from "../models/Note"
import { Request } from "express"
import { PipelineStage } from "mongoose"
import { QueryDB, Data } from "../../../typings"

const calcMisc = async (query: { page: number, limit: number }): Promise<[number, number, number]> => {
    const page = query.page || 1
    const limit = query.limit || 20
    const skip = (page - 1) * limit
    return [page, limit, skip]
}

const cleanReq = async (req: Request): Promise<{ queryArray: PipelineStage[], page: number, limit: number }> => {
    if (!req.query.page || !req.query.limit) {
        throw new Error()
    }
    const [page, limit, skip] = await calcMisc({ page: Number(req.query.page), limit: Number(req.query.limit) })
    const queryArray: PipelineStage[] = await createQueryArray(req, limit, skip)
    return { queryArray, page, limit }
}

const queryDB = async (req: Request): Promise<QueryDB> => {
    const { queryArray, page, limit } = await cleanReq(req)
    if (req.route.path.includes("/books")) {
        const result = await Books.aggregate(queryArray)
        return { result, page, limit }
    }
    const result = await Notes.aggregate(queryArray)
    return { result, page, limit }
}

export const getData = async (req: Request): Promise<Data> => {
    const { result, page, limit } = await queryDB(req)
    const { total, data, latest } = result[0]
    const totalResults = total[0] ? total[0].total : 0
    const totalPages = Math.ceil(totalResults / limit)
    return { totalResults, totalPages, page, limit, data, latest }
}

export const updateData = async (req: Request): Promise<void> => {
    await Books.findOneAndUpdate({ book: req.params.book }, req.body, {
        new: true,
        runValidators: true
    })
}

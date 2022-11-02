import { getData, updateData } from "../helpers/helpers"
import { Request, Response } from "express"

export const getFromBooks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { totalResults, totalPages, page, limit, data, latest } = await getData(req)

        if (data.length) {
            return res.status(200).send({
                total: totalResults, total_pages: totalPages,
                page: page, limit_per_page: limit,
                results_in_page: data.length, results: data,
                latest: latest
            })
        }
        return res.status(404).send({ total: totalResults, msg: "No books found" })

    } catch (error) {
        console.log(error)
        return res.status(404).send({ msg: "Something went wrong" })
    }
}

export const postToBooks = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (req.body.read) {
            await updateData(req)
            return res.status(200).send({ msg: `Updated book: ${req.params.book}` })
        }
        return res.status(200).send({ msg: "No data to update" })
    } catch (error) {
        console.log(error)
        return res.status(404).send({ msg: "Invalid data provided" })
    }
}

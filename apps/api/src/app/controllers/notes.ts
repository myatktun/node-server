import { getData } from "../helpers/helpers"
import { Request, Response } from "express"
import { Note } from "@projectx/shared/interface"
import fetch from "node-fetch"

export const getFromNotes = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { totalResults, totalPages, page, limit, data } = await getData(req)

        if (data.length) {
            if (req.params.note) {
                return res.status(200).send({
                    total: totalResults,
                    total_pages: totalPages,
                    page: page,
                    limit_per_page: limit,
                    results_in_page: data.length,
                    results: await convertMarkdown(data[0]),
                })
            }

            return res.status(200).send({
                total: totalResults,
                total_pages: totalPages,
                page: page,
                limit_per_page: limit,
                results_in_page: data.length,
                results: data,
            })
        }
        return res.status(404).send({
            total: totalResults,
            msg: `No results for "${req.query.search}"`,
        })
    } catch (error) {
        console.log(error)
        return res.status(404).send({ msg: "Something went wrong" })
    }
}

const convertMarkdown = async (data: Note): Promise<string> => {
    const res = await fetch("http://converter-api/v1/markdown", {
        method: "POST",
        body: JSON.stringify({ file: `${data.category}/${data.name}` }),
        headers: { "Content-Type": "application/json" },
    })
    const body = await res.json()
    return body.data
}

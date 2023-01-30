import { addData } from "../helpers/helpers"
import { Request, Response } from "express"
import { createProxyMiddleware } from "http-proxy-middleware"

if (!process.env.MAIN_API) {
    throw new Error("Invalid API to forward")
}

export const getBooks = createProxyMiddleware({
    target: process.env.MAIN_API,
    changeOrigin: true,
})

export const addBooks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const success = await addData(req.body)
        if (!success) {
            return res.status(201).send({ msg: "Books added" })
        }
        return res.status(404).send({ msg: "Invalid data provided" })
    } catch (error) {
        console.log("here")
        console.log(error)
        return res.status(404).send({ msg: "Invalid data provided" })
    }
}

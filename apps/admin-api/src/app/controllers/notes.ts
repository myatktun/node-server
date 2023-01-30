import { createProxyMiddleware } from "http-proxy-middleware"
import { Request, Response } from "express"
import { addData } from "../helpers/helpers"

if (!process.env.MAIN_API) {
    throw new Error("Invalid API to forward")
}

export const getNotes = createProxyMiddleware({
    target: process.env.MAIN_API,
    changeOrigin: true,
})

export const addNotes = async (req: Request, res: Response): Promise<Response> => {
    try {
        const success = await addData("notes", req.body)
        if (!success) {
            return res.status(201).send({ msg: "Notes added" })
        }
        return res.status(404).send({ msg: "Invalid data provided" })
    } catch (error) {
        console.log("here")
        console.log(error)
        return res.status(404).send({ msg: "Invalid data provided" })
    }
}

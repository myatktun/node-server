import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const checkToken = async (
    res: Response,
    authHeader: string,
    next: NextFunction
): Promise<void | Response> => {
    const token = authHeader.split(" ")[1]

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("Invalid JWT_SECRET")
        }
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(401).send({ msg: "Invalid Authentication" })
    }
}

const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer")) {
        return res.status(401).send({ msg: "Invalid Authentication" })
    }
    await checkToken(res, authHeader, next)
}

export default auth

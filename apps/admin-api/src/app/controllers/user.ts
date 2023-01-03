import User from "../models/User"
import { Request, Response } from "express"

if (!process.env.SECRET_KEY) {
    throw new Error("Invalid secret env variables")
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { name, password } = req.body
    const user = await User.findOne({ name })

    if (!user) {
        return res.status(404).send({ msg: "Invalid credentials" })
    }

    const passwordCorrect = await user.validPassword(password)

    if (!passwordCorrect) {
        return res.status(404).send({ msg: "Invalid credentials" })
    }

    return res
        .status(200)
        .send({ name: user.name, token: await user.createJWT() })
}

export const signup = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { name, password, secret } = req.body
    if (!name || !password || !secret) {
        return res.status(404).send({ msg: "Not enough info to create User" })
    }

    if (secret !== process.env.SECRET_KEY) {
        return res
            .status(404)
            .send({ msg: "Invalid secret key to create user" })
    }

    if (await User.findOne({ name })) {
        return res.status(404).send({ msg: "User already exists" })
    }

    const user = await User.create({ name, password })
    if (!user) {
        return res.status(404).send({ msg: "Error creating user" })
    }

    return res.status(201).send({ msg: "User created" })
}

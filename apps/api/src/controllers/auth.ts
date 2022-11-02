import User from "../models/User"
import { Request, Response } from "express"

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

    return res.status(200).json({ name: user.name, token: await user.createJWT() })
}

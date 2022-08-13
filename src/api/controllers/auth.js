import User from '../models/User.js'

export const login = async (req, res) => {
    const { name, password } = req.body
    const user = await User.findOne({ name })

    if (!user) {
        return res.status(404).send({ msg: 'Invalid credentials' })
    }

    const passwordCorrect = await user.validPassword(password)

    if (!passwordCorrect) {
        return res.status(404).send({ msg: 'Invalid credentials' })
    }

    res.status(200).json({ name: user.name, token: user.createJWT() })
}

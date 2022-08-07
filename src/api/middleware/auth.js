import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const checkToken = async (res, authHeader, next) => {
    const token = authHeader.split(' ')[1]

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(401).send({ msg: 'No authorized tokens' })
    }
}

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        if (req.body.name) {
            return await login(req, res, next)
        }
        return res.status(401).send({ msg: 'No tokens' })
    }
    await checkToken(res, authHeader, next)
}

const login = async (req, res, next) => {
    const { name, password } = req.body
    const user = await User.findOne({ name })

    if (!user) {
        return res.status(404).send({ msg: 'Invalid credentials' })
    }

    const passwordCorrect = await user.validPassword(password)

    if (!passwordCorrect) {
        return res.status(404).send({ msg: 'Invalid credentials' })
    }

    const id = new Date().getDate()
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: '10s' })
    req.authorized = { token, role: 'admin' }

    next()
}

export default auth

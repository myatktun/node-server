import jwt from 'jsonwebtoken'

const checkToken = async (res, authHeader, next) => {
    const token = authHeader.split(' ')[1]

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(401).send({ msg: 'Invalid Authentication' })
    }
}

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).send({ msg: 'Invalid Authentication' })
    }
    await checkToken(res, authHeader, next)
}

export default auth

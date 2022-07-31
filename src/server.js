import express from 'express'
import cors from 'cors'
import helmet from "helmet"

import connectDB from './api/db/connect.js'
import routes from './api/routes/routes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/api/v1', routes)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connected to mongodb')
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()

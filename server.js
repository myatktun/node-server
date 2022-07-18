import express from 'express'
import cors from 'cors'

import connectDB from './db/connect.js'
import routes from './routes/routes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

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

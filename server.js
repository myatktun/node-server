const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config({ path: './.env.test.local' })

const connectDB = require('./db/connect')
const routes = require('./routes/routes')

const PORT = 5000

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

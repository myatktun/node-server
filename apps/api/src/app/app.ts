import express from "express"
import cors from "cors"
import helmet from "helmet"

import routes from "./routes/routes"

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use("/v1", routes)

export default app

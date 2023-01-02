import connectDB from "./app/db/connect"
import app from "./app/app"

const PORT = process.env.PORT || 5000

const start = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("Invalid MONGO_URI")
        }
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to mongodb")
        app.listen(PORT, () =>
            console.log(`Server listening on port ${PORT}...`)
        )
    } catch (error) {
        console.log(error)
    }
}

start()

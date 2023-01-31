import app from "./app/app"

const PORT = process.env.PORT || 5000

const start = async (): Promise<void> => {
    try {
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()

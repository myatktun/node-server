import app from "./app/app"

const PORT = process.env.PORT || 5004

const start = async (): Promise<void> => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))
}

start()

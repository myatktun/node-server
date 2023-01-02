import request from "supertest"
import mongoose from "mongoose"
import app from "../src/app/app"

// Connect to database before all tests
beforeAll(async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("Invalid MONGO_URI")
    }
    await mongoose.connect(process.env.MONGO_URI)
})

// Close connection to database after all tests
afterAll(async () => {
    await mongoose.connection.close()
})

const userCount = Math.floor(Math.random() * 1000)

describe("Books", () => {
    it("SignUp (POST /v1/signup)", async () => {
        const res = await request(app)
            .post("/v1/signup")
            .send({
                name: `user${userCount}`,
                password: `user${userCount}`,
                secret: process.env.SECRET_KEY,
            })
        expect(res.statusCode).toBe(201)
    })

    it("Login (POST /v1/login)", async () => {
        const res = await request(app)
            .post("/v1/login")
            .send({
                name: `user${userCount}`,
                password: `user${userCount}`,
            })
        expect(res.statusCode).toBe(200)
    })
})

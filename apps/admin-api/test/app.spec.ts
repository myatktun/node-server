import request from "supertest"
import mongoose from "mongoose"
import app from "../src/app/app"

const testData = [
    {
        category: "Algorithms",
        name: "Clean Code Handbook: 50 Common Interview Questions",
        author: "LeetCode",
        dateAdded: "2022:05:02 14:01:30+06:30",
    },
    {
        category: "Biography",
        name: "Amazon Unbound: Jeff Bezos and the Invention of a Global Empire",
        author: "Brad Stone",
        isbn: "9781982132613",
        dateAdded: "2022:03:16 15:07:26+06:30",
        olid: "OL32070424M",
    },
    {
        category: "Fiction",
        name: "The Count of Monte Cristo",
        author: "Alexandre Dumas",
        isbn: "9780140449266",
        dateAdded: "2010:10:09 22:50:36+06:30",
        olid: "OL24277771M",
    },
]

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
let token: string

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
        token = res.body.token
        expect(res.statusCode).toBe(200)
    })

    it("Add Books (POST /v1/books)", async () => {
        const res = await request(app)
            .post("/v1/books")
            .set("Authorization", "bearer " + token)
            .send(testData)
        expect(res.statusCode).toBe(201)
    })
})

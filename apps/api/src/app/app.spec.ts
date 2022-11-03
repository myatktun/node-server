import { describe, expect } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "./app"

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

// Example response body
// {
//     "total": number,
//     "total_pages": number,
//     "page": number,
//     "limit_per_page": number,
//     "results_in_page": number,
//     "results": array
// }

describe("Books", () => {

    it("All Books (GET /api/v1/books/books)", async () => {
        const res = await request(app).get("/api/v1/books/books")
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe("total,total_pages,page,limit_per_page,results_in_page,results")
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results"].length).toBeGreaterThan(0)
    })

    it("Single Book (GET /api/v1/books/books/:book)", async () => {
        const res = await request(app).get("/api/v1/books/books/Steve%20Jobs")
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe("total,total_pages,page,limit_per_page,results_in_page,results")
        expect(res.body["total"]).toBe(1)
        expect(res.body["total_pages"]).toBe(1)
        expect(res.body["page"]).toBe(1)
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results_in_page"]).toBe(1)
        expect(res.body["results"].length).toBe(1)
        expect(Object.keys(res.body["results"][0]).toString()).toBe("_id,book,author,category,dateAdded,isbn,olid,read,similar,notes,relatedNotes")
    })

    it("All Authors (GET /api/v1/books/authors)", async () => {
        const res = await request(app).get("/api/v1/books/authors")
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe("total,total_pages,page,limit_per_page,results_in_page,results")
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results"].length).toBeGreaterThan(0)
    })

    it("Single Author (GET /api/v1/books/authors/:author)", async () => {
        const res = await request(app).get("/api/v1/books/authors/Haruki%20Murakami")
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe("total,total_pages,page,limit_per_page,results_in_page,results")
        expect(res.body["total"]).toBe(1)
        expect(res.body["total_pages"]).toBe(1)
        expect(res.body["page"]).toBe(1)
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results_in_page"]).toBe(1)
        expect(res.body["results"].length).toBe(1)
        expect(Object.keys(res.body["results"][0]).toString()).toBe("_id,books")
        expect(res.body["results"][0]["books"].length).toBeGreaterThan(0)
    })

    it("All Categories (GET /api/v1/books/categories)", async () => {
        const res = await request(app).get("/api/v1/books/categories")
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe("total,total_pages,page,limit_per_page,results_in_page,results")
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results"].length).toBeGreaterThan(0)
    })

    it("Single Category (GET /api/v1/books/categories/:category)", async () => {
        const res = await request(app).get("/api/v1/books/categories/fiction")
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe("total,total_pages,page,limit_per_page,results_in_page,results")
        expect(res.body["total"]).toBe(1)
        expect(res.body["total_pages"]).toBe(1)
        expect(res.body["page"]).toBe(1)
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results_in_page"]).toBe(1)
        expect(res.body["results"].length).toBe(1)
        expect(Object.keys(res.body["results"][0]).toString()).toBe("_id,books")
        expect(res.body["results"][0]["books"].length).toBeGreaterThan(0)
    })
})

describe("Notes", () => {

    it("GET /api/v1/notes", async () => {
        const res = await request(app).get("/api/v1/notes")
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe("total,total_pages,page,limit_per_page,results_in_page,results")
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results"].length).toBeGreaterThan(0)
    })
})

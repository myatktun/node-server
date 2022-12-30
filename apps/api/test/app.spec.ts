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
        const total_pages = (await request(app).get("/api/v1/books/books"))
            .body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(`/api/v1/books/books?page=${i}`)
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results"].length).toBeGreaterThan(0)
            i++
        }
    })

    it("Single Book (GET /api/v1/books/books/:book)", async () => {
        const res = await request(app).get("/api/v1/books/books/Steve%20Jobs")
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe(
            "total,total_pages,page,limit_per_page,results_in_page,results"
        )
        expect(res.body["total"]).toBe(1)
        expect(res.body["total_pages"]).toBe(1)
        expect(res.body["page"]).toBe(1)
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results_in_page"]).toBe(1)
        expect(res.body["results"].length).toBe(1)
        expect(Object.keys(res.body["results"][0]).toString()).toBe(
            "_id,book,author,category,dateAdded,isbn,olid,read,similar,notes,relatedNotes"
        )
    })

    it("Search existing Book (GET /api/v1/books/books?search=st)", async () => {
        const total_pages = (
            await request(app).get("/api/v1/books/books?search=st")
        ).body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(
                `/api/v1/books/books?search=st&page=${i}`
            )
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["total"]).toBeGreaterThanOrEqual(1)
            expect(res.body["total_pages"]).toBeGreaterThanOrEqual(1)
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results_in_page"]).toBeGreaterThanOrEqual(1)
            expect(res.body["results"].length).toBeGreaterThanOrEqual(1)
            i++
        }
    })

    it("Search non-existing Book (GET /api/v1/books/books?search=xaea12)", async () => {
        const res = await request(app).get("/api/v1/books/books?search=xaea12")
        expect(res.statusCode).toBe(404)
        expect(Object.keys(res.body).toString()).toBe("total,msg")
        expect(res.body["total"]).toBe(0)
        expect(res.body["msg"]).toBe('No results for "xaea12"')
    })

    it("All Authors (GET /api/v1/books/authors)", async () => {
        const total_pages = (await request(app).get("/api/v1/books/authors"))
            .body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(
                `/api/v1/books/authors?page=${i}`
            )
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results"].length).toBeGreaterThan(0)
            i++
        }
    })

    it("Single Author (GET /api/v1/books/authors/:author)", async () => {
        const res = await request(app).get(
            "/api/v1/books/authors/Haruki%20Murakami"
        )
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe(
            "total,total_pages,page,limit_per_page,results_in_page,results"
        )
        expect(res.body["total"]).toBe(1)
        expect(res.body["total_pages"]).toBe(1)
        expect(res.body["page"]).toBe(1)
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results_in_page"]).toBe(1)
        expect(res.body["results"].length).toBe(1)
        expect(Object.keys(res.body["results"][0]).toString()).toBe("_id,books")
        expect(res.body["results"][0]["books"].length).toBeGreaterThan(0)
    })

    it("Search existing Author (GET /api/v1/books/authors?search=s)", async () => {
        const total_pages = (
            await request(app).get("/api/v1/books/authors?search=s")
        ).body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(
                `/api/v1/books/authors?search=s&page=${i}`
            )
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["total"]).toBeGreaterThanOrEqual(1)
            expect(res.body["total_pages"]).toBeGreaterThanOrEqual(1)
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results_in_page"]).toBeGreaterThanOrEqual(1)
            expect(res.body["results"].length).toBeGreaterThanOrEqual(1)
            expect(Object.keys(res.body["results"][0]).toString()).toBe(
                "_id,books"
            )
            i++
        }
    })

    it("Search non-existing Author (GET /api/v1/books/authors?search=xaea12)", async () => {
        const res = await request(app).get(
            "/api/v1/books/authors?search=xaea12"
        )
        expect(res.statusCode).toBe(404)
        expect(Object.keys(res.body).toString()).toBe("total,msg")
        expect(res.body["total"]).toBe(0)
        expect(res.body["msg"]).toBe('No results for "xaea12"')
    })

    it("All Categories (GET /api/v1/books/categories)", async () => {
        const total_pages = (await request(app).get("/api/v1/books/categories"))
            .body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(
                `/api/v1/books/categories?page=${i}`
            )
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results"].length).toBeGreaterThan(0)
            i++
        }
    })

    it("Single Category (GET /api/v1/books/categories/:category)", async () => {
        const res = await request(app).get("/api/v1/books/categories/fiction")
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe(
            "total,total_pages,page,limit_per_page,results_in_page,results"
        )
        expect(res.body["total"]).toBe(1)
        expect(res.body["total_pages"]).toBe(1)
        expect(res.body["page"]).toBe(1)
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results_in_page"]).toBe(1)
        expect(res.body["results"].length).toBe(1)
        expect(Object.keys(res.body["results"][0]).toString()).toBe("_id,books")
        expect(res.body["results"][0]["books"].length).toBeGreaterThan(0)
    })

    it("Search existing Category (GET /api/v1/books/categories?search=fiction)", async () => {
        const total_pages = (
            await request(app).get("/api/v1/books/categories?search=fiction")
        ).body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(
                `/api/v1/books/categories?search=fiction&page=${i}`
            )
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["total"]).toBeGreaterThanOrEqual(1)
            expect(res.body["total_pages"]).toBeGreaterThanOrEqual(1)
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results_in_page"]).toBeGreaterThanOrEqual(1)
            expect(res.body["results"].length).toBeGreaterThanOrEqual(1)
            expect(Object.keys(res.body["results"][0]).toString()).toBe(
                "_id,books"
            )
            i++
        }
    })

    it("Search non-existing Category (GET /api/v1/books/categories?search=xaea12)", async () => {
        const res = await request(app).get(
            "/api/v1/books/categories?search=xaea12"
        )
        expect(res.statusCode).toBe(404)
        expect(Object.keys(res.body).toString()).toBe("total,msg")
        expect(res.body["total"]).toBe(0)
        expect(res.body["msg"]).toBe('No results for "xaea12"')
    })
})

describe("Notes", () => {
    it("All Notes (GET /api/v1/notes)", async () => {
        const total_pages = (await request(app).get("/api/v1/notes")).body[
            "total_pages"
        ]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(`/api/v1/notes?page=${i}`)
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results"].length).toBeGreaterThan(0)
            i++
        }
    })

    it("Single Note (GET /api/v1/notes/:note)", async () => {
        const res = await request(app).get("/api/v1/notes/Docker")
        expect(res.statusCode).toBe(200)
        expect(Object.keys(res.body).toString()).toBe(
            "total,total_pages,page,limit_per_page,results_in_page,results"
        )
        expect(res.body["total"]).toBe(1)
        expect(res.body["total_pages"]).toBe(1)
        expect(res.body["page"]).toBe(1)
        expect(res.body["limit_per_page"]).toBe(20)
        expect(res.body["results_in_page"]).toBe(1)
        expect(res.body["results"].length).toBe(1)
        expect(Object.keys(res.body["results"][0]).toString()).toBe(
            "_id,name,category,data"
        )
    })

    it("Search existing Note (GET /api/v1/notes?search=s)", async () => {
        const total_pages = (await request(app).get("/api/v1/notes?search=s"))
            .body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(
                `/api/v1/notes?search=s&page=${i}`
            )
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["total"]).toBeGreaterThanOrEqual(1)
            expect(res.body["total_pages"]).toBeGreaterThanOrEqual(1)
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results_in_page"]).toBeGreaterThanOrEqual(1)
            expect(res.body["results"].length).toBeGreaterThanOrEqual(1)
            i++
        }
    })

    it("Search non-existing Note (GET /api/v1/notes?search=xaea12)", async () => {
        const res = await request(app).get("/api/v1/notes?search=xaea12")
        expect(res.statusCode).toBe(404)
        expect(Object.keys(res.body).toString()).toBe("total,msg")
        expect(res.body["total"]).toBe(0)
        expect(res.body["msg"]).toBe('No results for "xaea12"')
    })
})

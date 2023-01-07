import request from "supertest"
import mongoose from "mongoose"
import app from "../src/app/app"
import { Author, Book, Category, Note } from "@projectx/api-interfaces"

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
    it("All Books (GET /v1/books)", async () => {
        const res = await request(app).get("/v1/books")
        expect(res.statusCode).toBe(200)
        const total_pages = res.body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(`/v1/books?page=${i}`)
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results"].length).toBeGreaterThan(0)
            res.body["results"].forEach((book: Book) => {
                expect(Object.keys(book).toString()).toBe(
                    "_id,name,author,category,dateAdded,isbn,olid,read"
                )
            })
            i++
        }
    })

    it("Single Book (GET /v1/books/:book)", async () => {
        const res = await request(app).get("/v1/books/63b3c714e88774e6df7b2b29")
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
            "_id,name,author,category,dateAdded,isbn,olid,read,similar,notes,relatedNotes"
        )
    })

    it("Search existing Book (GET /v1/books?search=st)", async () => {
        const res = await request(app).get("/v1/books?search=st")
        expect(res.statusCode).toBe(200)
        const total_pages = res.body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(`/v1/books?search=st&page=${i}`)
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

    it("Search non-existing Book (GET /v1/books?search=xaea12)", async () => {
        const res = await request(app).get("/v1/books?search=xaea12")
        expect(res.statusCode).toBe(404)
        expect(Object.keys(res.body).toString()).toBe("total,msg")
        expect(res.body["total"]).toBe(0)
        expect(res.body["msg"]).toBe('No results for "xaea12"')
    })

    it("All Authors (GET /v1/authors)", async () => {
        const res = await request(app).get("/v1/authors")
        expect(res.statusCode).toBe(200)
        const total_pages = res.body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(`/v1/authors?page=${i}`)
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results"].length).toBeGreaterThan(0)
            res.body["results"].forEach((author: Author) => {
                expect(Object.keys(author).toString()).toBe("name,books")
                expect(author.books.length).toBeGreaterThan(0)
            })
            i++
        }
    })

    it("Single Author (GET /v1/authors/:author)", async () => {
        const res = await request(app).get("/v1/authors/Haruki%20Murakami")
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
            "name,books"
        )
        expect(res.body["results"][0]["books"].length).toBeGreaterThan(0)
    })

    it("Search existing Author (GET /v1/authors?search=s)", async () => {
        const res = await request(app).get("/v1/authors?search=s")
        expect(res.statusCode).toBe(200)
        const total_pages = res.body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(`/v1/authors?search=s&page=${i}`)
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
                "name,books"
            )
            i++
        }
    })

    it("Search non-existing Author (GET /v1/authors?search=xaea12)", async () => {
        const res = await request(app).get("/v1/authors?search=xaea12")
        expect(res.statusCode).toBe(404)
        expect(Object.keys(res.body).toString()).toBe("total,msg")
        expect(res.body["total"]).toBe(0)
        expect(res.body["msg"]).toBe('No results for "xaea12"')
    })

    it("All Categories (GET /v1/categories)", async () => {
        const res = await request(app).get("/v1/categories")
        expect(res.statusCode).toBe(200)
        const total_pages = res.body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(`/v1/categories?page=${i}`)
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results"].length).toBeGreaterThan(0)
            res.body["results"].forEach((category: Category) => {
                expect(Object.keys(category).toString()).toBe("name,books")
                expect(category.books.length).toBeGreaterThan(0)
            })
            i++
        }
    })

    it("Single Category (GET /v1/categories/:category)", async () => {
        const res = await request(app).get("/v1/categories/fiction")
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
            "name,books"
        )
        expect(res.body["results"][0]["books"].length).toBeGreaterThan(0)
    })

    it("Search existing Category (GET /v1/categories?search=fic)", async () => {
        const res = await request(app).get("/v1/categories?search=fic")
        expect(res.statusCode).toBe(200)
        const total_pages = res.body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(
                `/v1/categories?search=fiction&page=${i}`
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
                "name,books"
            )
            i++
        }
    })

    it("Search non-existing Category (GET /v1/categories?search=xaea12)", async () => {
        const res = await request(app).get("/v1/categories?search=xaea12")
        expect(res.statusCode).toBe(404)
        expect(Object.keys(res.body).toString()).toBe("total,msg")
        expect(res.body["total"]).toBe(0)
        expect(res.body["msg"]).toBe('No results for "xaea12"')
    })
})

describe("Notes", () => {
    it("All Notes (GET /v1/notes)", async () => {
        const res = await request(app).get("/v1/notes")
        expect(res.statusCode).toBe(200)
        const total_pages = res.body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(`/v1/notes?page=${i}`)
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body).toString()).toBe(
                "total,total_pages,page,limit_per_page,results_in_page,results"
            )
            expect(res.body["page"]).toBe(i)
            expect(res.body["limit_per_page"]).toBe(20)
            expect(res.body["results"].length).toBeGreaterThan(0)
            res.body["results"].forEach((note: Note) => {
                expect(Object.keys(note).toString()).toBe("_id,name,category")
            })
            i++
        }
    })

    it("Single Note (GET /v1/notes/:note)", async () => {
        const res = await request(app).get("/v1/notes/62e3d03f78bcc2d563b18b88")
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

    it("Search existing Note (GET /v1/notes?search=s)", async () => {
        const res = await request(app).get("/v1/notes?search=s")
        expect(res.statusCode).toBe(200)
        const total_pages = res.body["total_pages"]
        let i = 1
        while (i <= total_pages) {
            const res = await request(app).get(`/v1/notes?search=s&page=${i}`)
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

    it("Search non-existing Note (GET /v1/notes?search=xaea12)", async () => {
        const res = await request(app).get("/v1/notes?search=xaea12")
        expect(res.statusCode).toBe(404)
        expect(Object.keys(res.body).toString()).toBe("total,msg")
        expect(res.body["total"]).toBe(0)
        expect(res.body["msg"]).toBe('No results for "xaea12"')
    })
})

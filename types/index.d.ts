// declare global {

interface Result {
    total: [{ total: number }]
    data: Book[]
    latest: object

}

interface QueryDB {
    result: Result[]
    page: number
    limit: number
}

interface Book {
    book: string
    author: string
    category: string
    dateAdded: string
    isbn: number
    olid: string
    read: string
}

interface Data {
    totalResults: number
    totalPages: number
    page: number
    limit: number
    data: Book[]
    latest: object
}

interface IUser {
    name: string
    password: string
    salt: string
    role: string
    createJWT: () => Promise<string>
    validPassword: (password: string) => Promise<boolean>
}

// }

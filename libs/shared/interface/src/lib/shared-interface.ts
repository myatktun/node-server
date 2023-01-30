export interface Book {
    _id: string
    name: string
    author: string
    isbn: number
    olid: string
    status: string
    dateAdded: string
    category: string
}

export interface Author {
    _id: string
    name: string
    books: [{ _id: string; name: string }]
}

export interface Note {
    _id: string
    name: string
    category: string
    dateAdded: string
}

export interface Data {
    totalResults: number
    totalPages: number
    page: number
    limit: number
    data: Book[] | Note[]
}

export interface ApiResponse {
    total: number
    total_pages: number
    page: number
    limit_per_page: number
    results_in_page: number
    results: Book[] | Author[] | Note[]
}

interface SingleBook extends Book {
    similar: Book[]
    notes: []
    relatedNotes: Note[]
}

export interface BookResponse extends ApiResponse {
    results: SingleBook[]
}

export interface Result {
    total: [{ total: number }]
    data: Book[] | Note[]
}

export interface QueryDB {
    result: Result[]
    page: number
    limit: number
}

export interface User {
    name: string
    password: string
    salt: string
    role: string
    createJWT: () => Promise<string>
    validPassword: (password: string) => Promise<boolean>
}

export interface Category {
    name: string
    books: Array<string>
}

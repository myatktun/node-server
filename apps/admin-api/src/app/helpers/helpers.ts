import Books from "../models/Book"
import { Book } from "@projectx/api-interfaces"

export const addData = async (books: Array<Book>): Promise<void | Error> => {
    try {
        for await (const book of books) {
            await Books.findOneAndUpdate({ name: book.name }, book, {
                upsert: true,
                new: true,
                runValidators: true,
            })
        }
    } catch (error) {
        console.log(error)
        return new Error(<string>error)
    }
}

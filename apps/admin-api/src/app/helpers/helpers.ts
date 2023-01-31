import { Books } from "../models/Book"
import { Notes } from "../models/Note"
import { Book, Note } from "@projectx/shared/interface"

export const addData = async (title: string, data: Book[] | Note[]): Promise<void | Error> => {
    try {
        for await (const item of data) {
            if (title === "books") {
                await Books.findOneAndUpdate({ name: item.name }, item, {
                    upsert: true,
                    new: true,
                    runValidators: true,
                })
            } else {
                await Notes.findOneAndUpdate({ name: item.name }, item, {
                    upsert: true,
                    new: true,
                    runValidators: true,
                })
            }
        }
    } catch (error) {
        console.log(error)
        return new Error(<string>error)
    }
}

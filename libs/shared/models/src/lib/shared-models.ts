import mongoose from "mongoose"
import { Book, Note } from "@projectx/shared/interface"

const BookSchema = new mongoose.Schema<Book>(
    {
        name: String,
        author: {
            type: String,
            default: "unknown",
        },
        isbn: {
            type: Number,
            default: 0,
        },
        olid: {
            type: String,
            default: "unknown",
        },
        status: {
            type: String,
            enum: {
                values: ["new", "reading", "finished"],
                message: "{VALUE} is not supported",
            },
            default: "new",
        },
        dateAdded: {
            type: String,
        },
        category: {
            type: String,
        },
    },
    { versionKey: false }
)

const NotesSchema = new mongoose.Schema<Note>(
    {
        name: {
            type: String,
            required: [true, "name must be provided"],
        },
        category: {
            type: String,
        },
        dateAdded: {
            type: String,
        },
    },
    { versionKey: false }
)

const Books = mongoose.model<Book>("Books", BookSchema)
const Notes = mongoose.model<Note>("Notes", NotesSchema)

export { Books, Notes }

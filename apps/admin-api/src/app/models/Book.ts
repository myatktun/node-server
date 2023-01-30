import mongoose from "mongoose"
import { Book } from "@projectx/shared/interface"

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

export default mongoose.model<Book>("Books", BookSchema)

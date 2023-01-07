import mongoose from "mongoose"
import { Note } from "@projectx/api-interfaces"

const NotesSchema = new mongoose.Schema<Note>(
    {
        name: {
            type: String,
            required: [true, "name must be provided"],
        },
        data: {
            type: String,
        },
        category: {
            type: String,
        },
    },
    { versionKey: false }
)

export default mongoose.model("Notes", NotesSchema)

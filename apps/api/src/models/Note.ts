import mongoose from "mongoose"

const NotesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name must be provided"]
    },
    data: {
        type: String
    },
    category: {
        type: String
    }
}, { versionKey: false })

export default mongoose.model("Notes", NotesSchema)

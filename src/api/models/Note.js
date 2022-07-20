import mongoose from 'mongoose'

const NotesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'file name must be provided']
  },
  data: {
    type: String
  }
})

export default mongoose.model('Notes', NotesSchema)

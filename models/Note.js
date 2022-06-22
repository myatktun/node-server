const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'file name must be provided']
  },
  data: {
    type: String
  }
})

module.exports = mongoose.model('Notes', notesSchema)

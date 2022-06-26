const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  book: String,
  author: {
    type: String,
    default: 'Unknown'
  },
  isbn: Number,
  olid: {
    type: String,
    default: 'unknown'
  },
  read: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Books', BookSchema)

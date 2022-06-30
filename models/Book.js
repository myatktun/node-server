const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  book: String,
  author: {
    type: String,
    default: 'unknown'
  },
  isbn: {
    type: Number,
    default: 0
  },
  olid: {
    type: String,
    default: 'unknown'
  },
  read: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: 'unknown'
  }
})

module.exports = mongoose.model('Books', BookSchema)

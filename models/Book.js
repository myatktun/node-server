const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  book: String,
  author: {
    type: String,
    default: 'Unknown'
  },
  isbn: Number,
  read: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Books', BookSchema)

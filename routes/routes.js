const express = require('express')
const router = express.Router()

const { getBooks, searchBooks } = require('../controllers/books')
const { getNotes, searchNotes } = require('../controllers/notes')

router.route('/books').get(getBooks)
router.route('/books/search').get(searchBooks)

router.route('/notes').get(getNotes)
router.route('/notes/search').get(searchNotes)

module.exports = router

const express = require('express')
const router = express.Router()

const { getBooks } = require('../controllers/books')
const { getNotes, searchNotes } = require('../controllers/notes')

router.route('/books/books').get(getBooks)

router.route('/notes').get(getNotes)
router.route('/notes/search').get(searchNotes)

module.exports = router

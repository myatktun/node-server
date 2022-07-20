import express from 'express'

import { getBooks, getBook, getAuthors } from '../controllers/books.js'
import { getNotes, searchNotes } from '../controllers/notes.js'

const router = express.Router()

router.route('/books').get(getBooks)
router.route('/books/book/:book').get(getBook)
router.route('/books/authors').get(getAuthors)

router.route('/notes').get(getNotes)
router.route('/notes/search').get(searchNotes)

export default router

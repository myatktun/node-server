import express from 'express'

import { getBooks, getSingleBook, getAuthors, getCategories } from '../controllers/books.js'
import { getNotes, searchNotes } from '../controllers/notes.js'

const router = express.Router()

router.route('/books/books').get(getBooks)
router.route('/books/books/:book').get(getSingleBook)
router.route('/books/authors').get(getAuthors)
router.route('/books/authors/:author').get(getAuthors)
router.route('/books/categories').get(getCategories)
router.route('/books/categories/:category').get(getCategories)

router.route('/notes').get(getNotes)
router.route('/notes/search').get(searchNotes)

export default router

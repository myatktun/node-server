import express from 'express'

import { getFromBooks, postToBooks } from '../controllers/books.js'
import { getFromNotes } from '../controllers/notes.js'
import auth from '../middleware/auth.js'
import { login } from '../controllers/auth.js'

const router = express.Router()

router.route('/books/books').get(getFromBooks)
router.route('/books/books/:book').get(getFromBooks).patch(auth, postToBooks)
router.route('/books/authors').get(getFromBooks)
router.route('/books/authors/:author').get(getFromBooks)
router.route('/books/categories').get(getFromBooks)
router.route('/books/categories/:category').get(getFromBooks)

router.route('/notes').get(getFromNotes)
router.route('/notes/:note').get(getFromNotes)

router.route('/login').post(login)

export default router

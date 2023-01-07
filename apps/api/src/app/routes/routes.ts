import express from "express"

import { getBooks } from "../controllers/books"
import { getFromNotes } from "../controllers/notes"

const router = express.Router()

router.route("/books").get(getBooks)
router.route("/books/:book").get(getBooks)
router.route("/authors").get(getBooks)
router.route("/authors/:author").get(getBooks)
router.route("/categories").get(getBooks)
router.route("/categories/:category").get(getBooks)

router.route("/notes").get(getFromNotes)
router.route("/notes/:note").get(getFromNotes)

export default router

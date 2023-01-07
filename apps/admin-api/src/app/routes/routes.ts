import express from "express"

import { login, signup } from "../controllers/user"
import { addBooks, getBooks } from "../controllers/books"
import { getNotes } from "../controllers/notes"

import auth from "../middleware/auth"

const router = express.Router()

router.route("/books").get(getBooks).post(auth, addBooks)
router.route("/books/:book").get(getBooks)
router.route("/authors").get(getBooks)
router.route("/authors/:author").get(getBooks)
router.route("/categories").get(getBooks)
router.route("/categories/:category").get(getBooks)

router.route("/notes").get(getNotes)
router.route("/notes/:note").get(getNotes)

router.route("/login").post(login)
router.route("/signup").post(signup)

export default router

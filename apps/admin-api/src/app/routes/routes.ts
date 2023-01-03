import express from "express"

import { login, signup } from "../controllers/user"
import { addBooks } from "../controllers/books"

import auth from "../middleware/auth"

const router = express.Router()

router.route("/books").post(auth, addBooks)
router.route("/login").post(login)
router.route("/signup").post(signup)

export default router

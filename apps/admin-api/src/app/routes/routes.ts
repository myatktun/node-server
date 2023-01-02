import express from "express"

import { login, signup } from "../controllers/user"
// import { postToBooks } from "../controllers/books"

// import auth from "../middleware/auth"

const router = express.Router()

// router.route("/books/:book").patch(auth, postToBooks)
router.route("/login").post(login)
router.route("/signup").post(signup)

export default router

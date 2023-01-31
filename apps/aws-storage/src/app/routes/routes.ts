import express from "express"
import { getNote } from "../controllers/notes"

const router = express.Router()

router.route("/notes/:category/:note").get(getNote)

export default router

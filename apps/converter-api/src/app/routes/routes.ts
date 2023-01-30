import express from "express"
import { convertMD } from "../controllers/markdown"

const router = express.Router()

router.route("/markdown").post(convertMD)

export default router

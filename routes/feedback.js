const express = require("express")
const verifyToken = require("../middleware/fetchUser")
const { createBlog, createFeed } = require("../controllers/feedback")
const router = express.Router()

router.post("/create", verifyToken, createFeed)

module.exports = router
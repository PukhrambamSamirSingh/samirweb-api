const express = require("express")
const verifyToken = require("../middleware/fetchUser")
const { createBlog } = require("../controllers/blog")
const router = express.Router()

router.post("/create", verifyToken, createBlog)

module.exports = router
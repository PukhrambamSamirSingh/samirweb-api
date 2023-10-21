const express = require("express")
const verifyToken = require("../middleware/fetchUser")
const { createProject } = require("../controllers/project")
const router = express.Router()

router.post("/create", verifyToken, createProject)

module.exports = router
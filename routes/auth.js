const express = require("express")
const { createUser, loginUser, logoutUser, google } = require("../controllers/auth")
const router = express.Router()

router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/google", google)
router.post("/logout", logoutUser)

module.exports = router
const express = require("express")
const verifyToken = require("../middleware/fetchUser")
const { getUser, setImage, setPassword } = require("../controllers/user")
const router = express.Router()

router.get("/get", verifyToken, getUser)
router.put("/setimage", verifyToken, setImage)
router.put("/setpassword", setPassword)

module.exports = router
const User = require("../models/User")
const bcrypt = require("bcryptjs")

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const { password, ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json({ error: "Error in fetching details" })
    }
}

const setImage = async (req, res) => {
    const { profilePic } = req.body
    const user = await User.findById(req.userId)
    try {
        if (user) {
            user.profilePic = profilePic
            await user.save()
            res.status(200).json("Image updated successfully")
        } else {
            return res.status(401).json("User not found")
        }
    } catch (error) {
        res.status(500).json({ error: "Error in setting image" })
    }
}

const setPassword = async (req, res) => {
    const { password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(password, salt)
    const user = await User.findOne({ email: req.body.email })
    try {
        if (user) {
            user.password = hashedPwd
            await user.save()
            res.status(200).json({ success: "Password updated successfully" })
        } else {
            return res.status(401).json("User not found")
        }
    } catch (error) {
        res.status(500).json({ error: "Error in updating password" })
    }
}

module.exports = {
    getUser,
    setImage,
    setPassword
}
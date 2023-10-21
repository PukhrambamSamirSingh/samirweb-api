const bcrypt = require("bcryptjs")
const User = require("../models/User");
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(401).json("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);
    try {
        const newUser = await User.create({
            ...req.body,
            password: hashedPwd,
        });
        const data = {
            id: newUser._id,
            isAdmin: newUser.isAdmin,
            didWork: newUser.didWork
        }
        const { password, ...other } = newUser._doc

        const token = jwt.sign(data, process.env.JWT_SECRET)
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json(other)
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
};

const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(401).json("Enter valid credentials")
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(401).json("Enter valid credentials")
    }
    const { password, ...other } = user._doc
    const data = {
        id: user._id,
        isAdmin: user.isAdmin,
        didWork: user.didWork
    }
    try {
        const token = jwt.sign(data, process.env.JWT_SECRET)
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json(other)
    } catch (error) {
        res.status(500).json({ error: "An error occurred while logigging" });
    }
}

const google = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            const data = {
                id: userExists._id,
                isAdmin: userExists.isAdmin,
                didWork: userExists.didWork
            }
            const { password, ...other } = userExists._doc
            const token = jwt.sign(data, process.env.JWT_SECRET)
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }).status(200).json(other)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPwd = await bcrypt.hash(generatedPassword, 10)
            const newUser = await User.create({
                name: req.body.name.split(" ").join(""),
                email: req.body.email,
                password: hashedPwd,
                profilePic: req.body.profilePic
            })
            const { password, ...other } = newUser._doc
            const data = {
                id: newUser._id,
                isAdmin: newUser.isAdmin,
                didWork: newUser.didWork
            }
            const token = jwt.sign(data, process.env.JWT_SECRET)
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }).status(200).json(other)
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while logigging with google", error });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", { secure: true, sameSite: "none" })
        res.status(200).json("Successfully logged out")
    } catch (error) {
        res.status(500).json({ error: "An error occurred while logigging out" });
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    google
}
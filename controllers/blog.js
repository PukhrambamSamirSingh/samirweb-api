const Blog = require("../models/Blog")

const createBlog = async (req, res) => {
    if (!req.isAdmin) {
        return res.status(401).json("Only Admin can create blog")
    }
    try {
        const newBlog = await Blog.create({
            userId: req.userId,
            ...req.body
        })
        res.status(200).json(newBlog)
    } catch (error) {
        res.status(500).json({ error: "Error in creating blog" })
    }
}

module.exports = {
    createBlog
}
const Project = require("../models/Project")

const createProject = async (req, res) => {
    if (!req.isAdmin) {
        return res.status(401).json("Only Admin can post projects")
    }
    try {
        const newProject = await Project.create({
            userId: req.userId,
            ...req.body
        })
        res.status(200).json(newProject)
    } catch (error) {
        res.status(500).json({ error: "Error in posting project" })
    }
}

module.exports = {
    createProject
}
const Feedback = require("../models/Feedback");

const createFeed = async (req, res) => {
    if (!req.didWork) {
        return res.status(401).json("Only clients or co-workers can feed");
    }

    try {
        // Check if a feedback entry already exists for the user
        const existingFeed = await Feedback.findOne({ userId: req.userId });

        if (existingFeed) {
            return res.status(400).json("Feedback already submitted");
        }

        const newFeed = await Feedback.create({
            userId: req.userId,
            ...req.body,
        });

        res.status(200).json(newFeed);
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
};

module.exports = {
    createFeed
}

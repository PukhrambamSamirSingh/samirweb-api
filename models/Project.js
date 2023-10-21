const mongoose = require("mongoose")
const { Schema } = mongoose

const ProjectSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String
    },
    title: {
        type: String
    },
    link: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Project", ProjectSchema)
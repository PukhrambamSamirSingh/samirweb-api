const mongoose = require("mongoose")
const { Schema } = mongoose

const BlogSchema = new Schema({
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
    desc: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Blog", BlogSchema)
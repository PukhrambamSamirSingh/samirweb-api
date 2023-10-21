const mongoose = require("mongoose")
const { Schema } = mongoose

const FeedSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    desc: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Feedback", FeedSchema)
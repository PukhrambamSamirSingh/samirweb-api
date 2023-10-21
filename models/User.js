const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profession: {
        type: String
    },
    profilePic: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    didWork: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)
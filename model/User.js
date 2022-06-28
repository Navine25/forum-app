const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    likedPost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForumApp'
    }],
    isVerify: {
        type: Boolean,
        default: false,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema);
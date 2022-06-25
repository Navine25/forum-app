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
    }]
})

module.exports = mongoose.model('user', userSchema);
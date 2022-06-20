const mongoose = require("mongoose")
const forumAppSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likeUp: {
        type: Number,
        required: true,
        default: 0
    },
    likeDown: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('ForumApp', forumAppSchema);
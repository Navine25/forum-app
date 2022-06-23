const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'ForumApp'
    },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
    },

},{timestamp: true})

module.exports = mongoose.model('comment', commentSchema)
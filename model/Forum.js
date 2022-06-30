const mongoose = require("mongoose")
const forumAppSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
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
    },
    image: {
        type: String,
        required: false
    },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
},{timestamp: true})

module.exports = mongoose.model('ForumApp', forumAppSchema);
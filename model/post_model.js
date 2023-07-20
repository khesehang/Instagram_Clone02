const mongoose = require('mongoose')
const  ObjectId  = mongoose.Schema.Types.ObjectId

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    pic: { type: String, required: true },
    postedBy: { type: ObjectId, ref: 'User',required: true },
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: 'User' }
    }],
}, {
    timestamps: true,
})

const PostModel = mongoose.model('Post', postSchema)
module.exports = PostModel;
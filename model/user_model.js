const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({

    username: { type: String, required: true, unique: true },
    email: {
        type: String, required: true, unique: true,
    },
    password: { type: String, required: true },
    fullname: {
        type: String, required: true
    },
    profilePicture: String,
    bio: String,
    posts: [{
        type: Schema.ObjectId,
        ref: 'Post'
    }],
    followers: [{ type: Schema.ObjectId,
        ref: 'User'
    }],
    following: [
        {
            type: Schema.ObjectId,
            ref: 'User'
        }
    ],
    likes: [
        {
            type: Schema.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel;
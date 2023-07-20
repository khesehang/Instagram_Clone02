const { validationResult } = require("express-validator");
const UserModel = require("../../model/user_model");
const isValidId = require("../../utils/IdValidator");

const getUser = async (req, res, next) => {
    const userId = req.params.id

    // validate the user ID  format before attempting to remove the user 
    if (!isValidId(userId)) {
        return res.status(400).json({ error: 'Invalid usr ID format' })
    }
    UserModel.findById(userId)
        .then(user => {
            if (!user) return res.status(404).json({ msg: "User not found" });
            return res.json(user)
        })
        .catch(err => {
            return next(err)
        })
}

const updateUser = async (req, res, next) => {
    const userId = req.params.id

    // validate the user ID  format before attempting to remove the user 
    if (!isValidId(userId)) {
        return res.status(400).json({ error: 'Invalid usr ID format' })
    }
    UserModel.findByIdAndUpdate(userId, {
        $set: req.body
    }, { new: true })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            return next(err)
        })
}



const searchUsers = async (req, res, next) => {



    const emailPattern = new RegExp('^' + req.query.email, 'i'); // 'i' flag for case-insensitive search
    const userPattern = new RegExp('^' + req.query.username, 'i'); //
    UserModel.find({
        $or: [
            { email: { $regex: emailPattern } },
            { username: { $regex: userPattern } }
        ]
    })
        .select('_id email username')
        .then(users => {
            res.json({ users });
        })
        .catch(err => {
            console.error('Error searching for users:', err);
            res.status(500).json({ error: 'An error occurred while searching for users.' });
        });
}

// TODOs

// follow
const follow = async (req, res, next) => {
    const followId = req.body.followId
    console.log('follwoid', followId)
    try {
        // update the user being followed {target user}
        const targetUser = await UserModel.findByIdAndUpdate(followId, {
            $push: { followers: req.user._id }
        }, { new: true })

        // Update the followers {req.user}
        const followerUser = await UserModel.findByIdAndUpdate(req.user._id, {
            $push: { following: followId }
        }, { new: true })

        res.json(followerUser)
    } catch (error) {
        return next(error)
    }
}
// unfollow
const unFollow = async (req, res, next) => {
    const followId = req.body.followId
    try {
        const targetUser = await UserModel.findByIdAndUpdate(followId, {
            $pull: { followers: req.user._id }
        }, { new: true })

        const followerUser= await UserModel.findByIdAndUpdate(req.user._id, {
            $pull: {following: followId}
        },{new : true})
        res.json(followerUser)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getUser,
    updateUser,
    searchUsers,
    follow,
    unFollow
}
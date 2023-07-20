const { validationResult } = require("express-validator");
const UserModel = require("../../model/user_model");
const isValidId = require("../../utils/IdValidator");

const getUser = async (req, res, next) => {
    UserModel.findById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ msg: "User not found" });
            return res.json(user)
        })
        .catch(err => {
            return next(err)
        })
}

const updateUser = async (req, res, next) => {
    UserModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            return next(err)
        })
}

const removeUser = async (req, res, next) => {
    try {
        const userId = req.params.id

        // validate the user ID  format before attempting to remove the user 
        if (!isValidId(userId)) {
            return res.status(400).json({ error: 'Invalid usr ID format' })
        }

        const deletedUser = await UserModel.findByIdAndDelete(userId)

        // Check if the user with the given ID exists and was deleted successfully
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json({ message: "User removed successfully", deletedUser })

    } catch (error) {
        return next(error)
    }
    // UserModel.findByIdAndDelete(req.params.id)
    //     .then(result => {
    //         res.send({ msg: 'User removed successfully' })
    //     })
    //     .catch(err => {
    //         return next(err)
    //     })
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

module.exports = {
    getUser,
    updateUser,
    removeUser,
    searchUsers,
}
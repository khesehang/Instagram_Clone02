const jwt = require('jsonwebtoken');
const UserModel = require('../model/user_model');

const userVerify = async (req, res, next) => {
    let token;
    if (req.headers['authorization'])
        token = req.headers['authorization']
    if (req.headers['x-access-token'])
        token = req.headers['x-access-token']
    if (req.headers['token'])
        token = req.headers['token']
    if (req.query.token)
        token = req.query.token
    if (!token) return next({
        msg: 'Authorization failed, Token not Provided',
        status: 401
    })
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(err)
        }
        UserModel.findById(decoded._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => {
                return next(err)
            })
    })
}

module.exports = {
    userVerify
}
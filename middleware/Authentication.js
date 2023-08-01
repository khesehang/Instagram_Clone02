const jwt = require('jsonwebtoken');
const UserModel = require('../model/user_model');

const userVerify = async (req, res, next) => {
    try {
        let token;
        const headerToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token'];
        const queryToken = req.query.token;

        token = headerToken || queryToken;

        if (!token) {
            return next({
                msg: 'Authorization failed, Token not Provided',
                status: 401,
            });
        }

        // remove the "Bearer " prefix from the token, if present
        if (token.startsWith('Bearer ')) {
            token = token.slice(7).trim()
        }

        console.log('token is ', token);

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return next({
                msg: 'User not found',
                status: 404,
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    userVerify,
};

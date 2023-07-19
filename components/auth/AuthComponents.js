const UserModel = require('../../model/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Register = async (req, res, next) => {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new UserModel({
        ...req.body,
        password: hash,
    })
    try {

        await newUser.save()
        res.json(newUser)
    } catch (error) {
        return next(error)
    }
}

const Login = async (req, res, next) => {
    try{
    const data = req.body
   const user = await  UserModel.findOne({
    $or: [
        { username: data.username },
        { email: data.username },
    ]
})
    
        if(!user) {
            return next({
                msg: 'Invalid username',
                status: 400
            })
        }

        isMatched = await bcrypt.compare(data.password,user.password)
        if(!isMatched) {
            return res.json({msg: 'Username or Password not matched'})
        }

        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY)
        
        return res.json({user,token})
    }
    catch(err) {
        return next(err)
    }
}

module.exports = {
    Register,
    Login
}
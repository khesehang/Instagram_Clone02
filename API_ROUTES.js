const router = require('express').Router();

const AuthRoutes = require('./routes/AuthRoutes')
const UserRoutes = require('./routes/UserRoutes')
const PostRoutes = require('./routes/PostRoutes.js')

router.use('/auth',AuthRoutes)
router.use('/user',UserRoutes)
router.use('/post',PostRoutes)

module.exports = router;
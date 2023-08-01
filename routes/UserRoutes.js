const { body } = require('express-validator');
const { getUser, updateUser, removeUser, searchUsers, follow, unFollow } = require('../controllers/user/UserController');
const { userVerify } = require('../middleware/Authentication');


const router = require('express').Router();

router.post('/search', userVerify, searchUsers)
router.put('/follow', userVerify, follow)
router.put('/unfollow', userVerify, unFollow)
router.put('/:id', userVerify, updateUser)
router.get('/:id', getUser)

module.exports = router;

const { body } = require('express-validator');
const { getUser, updateUser, removeUser, searchUsers } = require('../controllers/user/UserController');
const { userVerify } = require('../middleware/Authentication');


const router = require('express').Router();

router.post('/search',userVerify,searchUsers)
router.get('/:id',getUser)
router.put('/:id',updateUser)
router.delete('/:id',removeUser)

module.exports = router;

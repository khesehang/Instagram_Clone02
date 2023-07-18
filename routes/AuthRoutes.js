const { Register, Login } = require('../components/auth/AuthComponents');

const router = require('express').Router();

router.post('/register',Register)
router.post('/login',Login)

module.exports = router;

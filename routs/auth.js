const express = require('express');// turn on express lib
const { login, register, logout } = require('../controllers/auth');
const  router = express.Router(); // constructor for local router
const check = require('../middleware/checkAuth');

router.post('/login', check , login);
router.post('/register', register);
router.post('/logout', logout);






module.exports = router// export local router

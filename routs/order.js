const express = require('express')// turn on express lib
const { getAll, create } = require('../controllers/order')
const  router = express.Router() // constructor for local router

router.get('/', getAll);
router.post('/register', create);

module.exports = router// export local router

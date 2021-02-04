const express = require('express')// turn on express lib
const { overview, analytics } = require('../controllers/analytics')
const  router = express.Router() // constructor for local router

router.get('/overview', overview);
router.post('/analytics', analytics);

module.exports = router// export local router

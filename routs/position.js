const express = require('express')
const {getByCategoryId} = require("../controllers/position");
const {remove} = require("../controllers/category");
const {update} = require("../controllers/category");
const {create} = require("../controllers/category");
// turn on express lib
const { login, register } = require('../controllers/position')
const  router = express.Router() // constructor for local router

router.get('/categoryId', getByCategoryId);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = router;

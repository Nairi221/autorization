const express = require('express')// turn on express lib
const { getAll, getById, remove, create, update } = require('../controllers/category')
const  router = express.Router() // constructor for local router

router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', remove);
router.post('/', create);
router.patch
('/:id', update);

module.exports = router// export local router

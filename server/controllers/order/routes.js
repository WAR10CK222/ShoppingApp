const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.get);
router.post('/', controller.postNew);
router.get('/:id', controller.show);
router.delete('/:id', controller.remove);
router.get('/find/:id', controller.findUserOrder);

module.exports = router;
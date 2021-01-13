const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.get);
router.post('/login', controller.login);
router.post('/', controller.postNew);
router.get('/:id', controller.show);
router.post('/:id', controller.checkPassword);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
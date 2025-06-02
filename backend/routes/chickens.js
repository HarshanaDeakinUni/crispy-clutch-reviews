const express = require('express');
const router = express.Router();
const controller = require('../controllers/chickens.controller');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.post('/:id/vote', controller.vote);
router.post('/:id/comment', controller.comment);
router.delete('/:id', controller.delete);

module.exports = router;
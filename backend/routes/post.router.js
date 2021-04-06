const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.post('/new', postController.createPost);

module.exports = router;
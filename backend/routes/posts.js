const express = require('express');

const PostController = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/extractFile');

const router = express.Router();



router.post('', checkAuth, extractFile, PostController.newPost);

router.put('/:id', checkAuth, extractFile, PostController.updatePost);

router.get('', PostController.getPosts);

router.get('/:id', PostController.getPost)

router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;
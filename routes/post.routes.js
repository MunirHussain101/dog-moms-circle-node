const express = require('express');
const router = express.Router();
const Controller = require('../controllers/post.controller')

router.post('/api/getPosts',  Controller.getPosts)
router.post('/api/setPosts', Controller.createPost)
// router.put('/api/posts/:id', Controller.updatePost)
// router.delete('/api/posts/:id', Controller.deletePost)

module.exports = router;
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/post.controller')

router.get('/api/posts',  Controller.getPosts)
router.post('/api/posts', Controller.createPost)
router.get('/api/get-post/:id', Controller.getPostWithId)
// router.put('/api/posts/:id', Controller.updatePost)
// router.delete('/api/posts/:id', Controller.deletePost)

module.exports = router;
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/post.controller')

router.post('/api/getPosts',  Controller.getPosts)
router.post('/api/setPosts', Controller.createPost)
router.get('/api/post/:id', Controller.getPost)
router.get('/api/check_user_data/:id', Controller.isUserInfoComplete)
module.exports = router;
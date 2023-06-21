const express = require('express')
const Controller = require('../controllers/review.controller')

const router = express.Router()

router.post('/api/review/comment', Controller.setReviewComments)
router.post('/api/review/:targetId', Controller.setReview)
router.get('/api/review/:id', Controller.getReviews)

module.exports = router
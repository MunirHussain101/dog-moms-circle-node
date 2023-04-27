const express = require('express')
const Controller = require('../controllers/review.controller')

const router = express.Router()

router.post('/api/review/:targetId', Controller.setReview)

module.exports = router
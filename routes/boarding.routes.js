const express = require('express')
const Controller = require('../controllers/boarding.controller')

const router = express.Router()


router.post('/api/create-boarding-request', Controller.createBoardingRequest);
router.post('/api/approve-boarding-request', Controller.approveBoardingRequest);
router.post('/api/delete-boarding-request', Controller.deleteBoardingRequest)

module.exports = router
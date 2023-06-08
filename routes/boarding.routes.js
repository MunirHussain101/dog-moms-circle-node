const express = require('express')
const  boardingController = require("../controllers/boarding.controller");

const router = express.Router();

router.post(
    '/api/boarding',
    boardingController.board
)
router.post(
    '/api/update_boarding_status',
    boardingController.updateBoardingStatus
)

module.exports = router
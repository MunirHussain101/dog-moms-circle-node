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

router.post(
    '/api/bookings',
    boardingController.getBookings
)

router.post(
    '/api/get_boarding',
    boardingController.checkBoarding
)

module.exports = router
const express = require('express')
const  boardingController = require("../controllers/boarding.controller");

const router = express.Router();

router.post('/api/boarding', boardingController.board)

module.exports = router
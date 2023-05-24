const express = require('express')
const { authJwt } = require("../middlerware");
const controller = require("../controllers/user.controller");

const router = express.Router();

router.post('/api/user/get-profile', controller.getProfileData)
router.get('/api/users', controller.getUsers)
router.get('/api/breeds', controller.getBreeds)

module.exports = router



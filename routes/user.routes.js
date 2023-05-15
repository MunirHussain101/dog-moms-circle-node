const express = require('express')
const { authJwt } = require("../middlerware");
const controller = require("../controllers/user.controller");

const router = express.Router();

router.post('/api/user/get-profile', controller.getProfileData)
router.get('/api/users', controller.getUsers)
router.get('/api/breeds', controller.getBreeds)
router.get('/api/get-user:id', controller.getUser)
// router.get('/api/test/all', controller.allAccess)

module.exports = router



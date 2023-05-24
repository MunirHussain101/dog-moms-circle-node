const express = require('express')
const UserRoles = require('../models/user-role')

const { verifySignUp } = require("../middlerware")

const  authController = require("../controllers/auth.controller");

const router = express.Router();

router.post('/api/auth/signup', authController.signup)
router.post('/api/auth/additional-data', authController.setAdditionalData)
router.post('/api/auth/signin', authController.signin)

module.exports = router
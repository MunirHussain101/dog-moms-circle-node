const express = require('express')
const UserRoles = require('../models/user-role')

const { verifySignUp } = require("../middlerware")

const  authController = require("../controllers/auth.controller");

const router = express.Router();

router.post('/api/auth/signup', authController.signup)
router.post('/api/auth/additional-data', authController.setAdditionalData)
router.post('/api/auth/signin', authController.signin)

// module.exports = function(app) {
//     app.use(function(req, res, next) {
//       res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//       );
//       next();
//     });
  
//     app.post(
//       "/api/auth/signup",
//       authController.signup
//     );
  
//     app.post("/api/auth/signin", controller.signin);
//   };
module.exports = router
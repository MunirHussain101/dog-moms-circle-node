const express = require('express')
const { authJwt } = require("../middlerware");
const controller = require("../controllers/user.controller");

const router = express.Router();

router.get('/api/test/all', controller.allAccess)

module.exports = router


// module.exports = function(app) {

//   // app.get(
//   //   "/api/test/user",
//   //   [authJwt.verifyToken],
//   //   controller.userBoard
//   // );

//   // app.get(
//   //   "/api/test/mod",
//   //   [authJwt.verifyToken, authJwt.isModerator],
//   //   controller.moderatorBoard
//   // );

//   // app.get(
//   //   "/api/test/admin",
//   //   [authJwt.verifyToken, authJwt.isAdmin],
//   //   controller.adminBoard
//   // );
// };


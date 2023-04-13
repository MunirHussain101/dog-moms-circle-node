
const User = require('../models/user')
const Role = require('../models/role')
const UserRole = require('../models/user-role')
exports.allAccess = async (req, res, next) => {
    try {    // Find all users
    const users = await User.findAll({
      include: [{
        model: UserRole,
        include: [{
          model: Role
        }]
      }]
    });
    res.status(200).json({
      status: 200,
      data: users,
      message: 'User List',
      error: false
    })
    } catch(err){
      next(err)
    }
  };
  
  // exports.userBoard = (req, res) => {
  //   res.status(200).send("User Content.");
  // };
  
  // exports.adminBoard = (req, res) => {
  //   res.status(200).send("Admin Content.");
  // };
  
  // exports.moderatorBoard = (req, res) => {
  //   res.status(200).send("Moderator Content.");
  // };

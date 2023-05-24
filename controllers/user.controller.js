
const User = require('../models/user')
const Role = require('../models/role')
const UserRole = require('../models/user-role');
const Dog = require('../models/dog');
const Breed = require('../models/breed');

const postService = require('../services/post.service');
const userService = require('../services/user.service')

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

exports.getProfileData = async (req, res, next) => {
  try {
    const {id} = req.body
    if(!id) throw new Error('No id or token provided')

    const user = await User.findOne({
      where: {id},
      include: [Role, Dog],
    })
    const cache = [];
    const revised_user = JSON.parse(JSON.stringify(user, (key, value) => {
      if(key === 'password') {
        return undefined;
      }
      if (typeof value === 'object' && value !== null) {
        if (cache.includes(value)) {
          return '[Circular]';
        }
        cache.push(value);
      }
      return value;
    }));

    res.json(revised_user)
  } catch(err) {
    console.log(err)
    next(err)
  }
}

exports.getUsers = async(req, res, next) => {
  try {
    const token = req.header
    const users = await User.findAll()
    const revised_users = []
    users.forEach(user => {
      const {password, ...revised_user} = user.dataValues
      revised_users.push({...revised_user})
    })
    res.json(revised_users)
  } catch(err) {
    next(err)
  }
}

exports.getBreeds = async(req, res, next) => {
  try {
    const breeds = await userService.getBreeds()
    res.json(breeds)
  } catch(err) {
    next(err)
  }
}
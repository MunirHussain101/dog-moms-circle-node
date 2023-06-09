
const User = require('../models/user')
const Role = require('../models/role')
const UserRole = require('../models/user-role');
const Dog = require('../models/dog');
const Breed = require('../models/breed');
 
const postService = require('../services/post.service');
const userService = require('../services/user.service');
const { where } = require('sequelize');

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
    const {id, token} = req.body
    if(!id || !token) throw new Error('No id or token provided')

    const user = await User.findOne({
      where: {id},
      include: [Role, Dog]
    })
    // let a = null;
    // if(user) {
    //   // user.dogs.forEach(yooooooo => {
    //   //   console.log({yooooooo:yooooooo.dataValues})
    //   // })
    //   user.dogs = await Promise.all(user.dogs.map(async (dog) => {
    //     console.log({"dog.dataValues breed":dog.dataValues.breedId})
    //     const breed = await Breed.findOne({ where: { id: dog.dataValues.breedId } });
    //     console.log({yooooooo:breed})
    //     dog.breed = breed.name;
    //     return dog;
    //   }))
    // }
    // const breed = await Breed.findOne({where: {id: user.roles}})
    res.json(user)
  } catch(err) {
    console.log(err)
    next(err)
  }
}

exports.getUsers = async(req, res, next) => {
  try {
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
exports.getUser = async(req,res,next) => {
  const id = req.parms.id
  try{
    const user = await User.findOne({
      where : {
        id : id
      }
    })
    if(!user){
      res.status(404).json({
        message : "not found"
      })
    }
    res.status(200).json(user)
  }
  catch(e){
    next(err)
  }
}
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Sequelize = require('sequelize')

const ApiError = require("../helpers/ApiError");
const config = require("../app/config/auth.config");
const sequelize = require('../utils/database')
const User = require('../models/user');
const Role = require("../models/role");
const UserRole = require("../models/user-role");
const Dog = require("../models/dog");
const Breed = require("../models/breed");
const Point = require("../models/point");
// const UserDogs = require("../models/user-dogs");
// const {User, Role, Sequelize, UserRoles, sequelize} = require("../app/models");

const Op = Sequelize.Op;

exports.signup = async (req, res, next) => {
  // Save User to Database
  const transaction = await sequelize.transaction();
  try {
    const userExists = await User.findOne({where: {email: req.body.email}})
    if (userExists) {
      throw new ApiError(404, "Email already exists");
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const role = await Role.findOne({name: 'user'})
    const user = await User.create(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password,
        phone: req.body.phone,
        roleId: role.id,
        tc_accepted: req.body.tc_accepted || false,
        is_verified: true
      },
      { transaction }
    );
    const userRole = await UserRole.create({
      userId: user.id,
      roleId: role.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {transaction})
    const point = await Point.create({
      userId: user.id,
      points: 100,
      approved_type: 'host', /** IMPORTANT */
      /** this approve type will be changed, have to think and ask why will it be changed and why is it in points table */
      /** what is the intent of approve type being here */
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {transaction})
    await transaction.commit();

    const token = jwt.sign(
      {id: user.id,},
      config.secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );
    const {password: pass, ...revised_user} = user.dataValues
    res.status(201).json({
      data: {
        ...revised_user,
        roles: userRole,
        token,
      },
      message: "User Registered Successfully",
      error: false,
      status: 201,
    });
  } catch (error) {
    console.log(error)
    await transaction.rollback();
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}, include: Role})

    if (!user) {
      throw new ApiError(404, "Email is not Valid");
    }

    let isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      res.status(401).json({
        data: {
          ...user.dataValues,
        },
        message: "Invalid Password",
        error: false,
        status: 401,
      });
    }

    const token = jwt.sign(
      {id: user.id, roleId: user.roles[0].roleId},
      config.secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );
    const {password,...revised_user} = user.dataValues
    res.status(200).json({
      data: {
        user:revised_user,
        token,
      },
      message: "Login Successful",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.setAdditionalData = async (req, res, next) => {
  // res.send('yes')
  // return;
  const transaction = sequelize.transaction()
  try {
    const {id, email} = req.body
    if(!id) throw new Error('no user id provided')

    const acitvity_arr = req.body.activity_type.split(',')
    const updatedUser = await User.update({
      zipCode: req.body.zipCode,
      willing_travel_distance: req.body.willing_travel_distance,
      activity_type: acitvity_arr,
      spay_neuter_prefs: req.body.spay_neuter_prefs,
      shedding_prefs: req.body.shedding_prefs,
      house_training_prefs: req.body.house_training_prefs,
      dog_left_alone_prefs: req.body.dog_left_alone_prefs,
      have_a_cat: req.body.have_a_cat,
      additional_notes: req.body.additional_notes,
      profile_pic: req.body.user_profile,
    }, {where: {id}}, {transaction})

    const breed = await Breed.findOne({where: {name: req.body.dog_breed}})
    if(!breed) throw new ApiError(404, 'breed does not exist')
    const user = await User.findOne({where: {id: id}})
    if(!user)  throw new ApiError(404, 'user does not exist')
    const compat_arr = req.body.dog_other_dog_size_compatibility ? req.body.dog_other_dog_size_compatibility.split(','): null
    const dog = await Dog.create({
      name: req.body.dog_name,
      date_of_birth: req.body.dog_birthday,
      size: req.body.dog_size,
      shedding_level: req.body.dog_shedding,
      house_trained: req.body.dog_house_trained,
      can_be_left_alone: req.body.dog_can_be_left_alone,
      spayed_neutered: req.body.dog_spayed_neutered,
      good_with_cats: req.body.dog_good_with_cats,
      other_dog_size_compatibility: compat_arr,
      profile_pic: req.body.dog_profile,
      breedId: breed.dataValues.id,
      userId: parseInt(user.id)
    })

    res.status(200).json({
      msg: 'Success'
    })
  } catch(err) {
    console.log(err)
    next(err)
  }
  
}

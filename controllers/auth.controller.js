const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ApiError = require("../helpers/ApiError");
const config = require("../app/config/auth.config");
const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const User = require('../models/user');
const Role = require("../models/role");
const UserRole = require("../models/user-role");
const Dog = require("../models/dog");
const Breed = require("../models/breed");
const UserDogs = require("../models/user-dogs");
// const {User, Role, Sequelize, UserRoles, sequelize} = require("../app/models");

const Op = Sequelize.Op;

exports.signup = async (req, res, next) => {
  // Save User to Database
  const transaction = await sequelize.transaction();
  try {
    const [userExists, roles] = await Promise.all([
      User.findOne({
        where: {
          email: req.body.email
        },
        transaction,
      }),
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }, transaction
      }),
    ]);
    if (
      !roles ||
      !Array.isArray(roles) ||
      roles.length !== req.body.roles.length
    ) {
      throw new ApiError(400, "Roles not Found");
    }
    if (userExists) {
      throw new ApiError(404, "User already exists");
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password,
        phone: req.body.phone,
        zipCode: req.body.zipCode,
        is_verified: false,
        willing_travel_distance: req.body.willing_travel_distance,
        activity_type: req.body.activity_type,
        spay_neuter_prefs: req.body.spay_neuter_prefs,
        shedding_prefs: req.body.shedding_prefs,
        house_training_prefs: req.body.house_training_prefs,
        have_a_cat: req.body.have_a_cat,
        additional_notes: req.body.additional_notes,
        profile_pic: req.body.profile_pic
      },
      {
        transaction,
      }
    );
    const breed = await Breed.findOne({where: {name: req.body.dog.breed}})
    if(!breed) throw new Error('Breed not found')
      const id = user.id
    const dog = await Dog.create({
      name: req.body.dog.name,
      date_of_birth: req.body.dog.birthday,
      size: req.body.dog.size,
      shedding_leve: req.body.dog.shedding,
      house_trained: req.body.dog.house_trained,
      can_be_left_alone: req.body.dog.can_be_left_alone,
      spayed_neutered: req.body.dog.spayed_neutered,
      good_with_cats: req.body.dog.good_with_cats,
      other_dog_size_compatibility: req.body.dog.other_dog_size_compatibility,
      breedId: breed.id,
      userId: parseInt(user.id)
    }, {transaction})
    
    const userRoles = await Promise.all(
      roles.map(async (role) => {
        return await UserRole.create(
          {userId: user.id, roleId: role.id},
          {transaction}
        );
      })
    );

    await transaction.commit();

    res.status(201).json({
      data: {
        ...user.dataValues,
        roles: userRoles,
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
    // const user = await User.findOne({
    //   where: {
    //     email: req.body.email,
    //   },
    //   include: [
    //     {
    //       model: UserRole,
    //       include: [
    //         {
    //           model: Role,
    //         },
    //       ],
    //     },
    //   ],
    // });
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
    delete user.password

    res.status(200).json({
      data: {
        user,
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




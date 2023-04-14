const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
  },
  password: {
    type: Sequelize.STRING(64),
    min: 6
  },
  zipCode: {
    type: Sequelize.STRING(8),
  },
  phone: {
    type: Sequelize.INTEGER,
  },
  is_verified: {
    type: Sequelize.BOOLEAN,
    defaulValue: false
  },
  // 
  willing_travel_distance: {
    type: Sequelize.ENUM('<10 miles', '10-25 miles', '>25 miles')
  },

  activity_type: {
    type: Sequelize.ENUM('boarding', 'daycare', 'playdate')
  },
  spay_neuter_prefes: {
    type: Sequelize.ENUM('no preference', 'prefer fixed dog')
  },
  shedding_prefs: {
    type: Sequelize.ENUM('no shedding', 'moderate', 'doesnt bother')
  },
  house_training_prefs: {
    type: Sequelize.ENUM('fully trained', 'doesnt bother')
  },
  dog_left_alone_prefs: {
    type: Sequelize.ENUM('no', 'couple hours', 'a few hours')
  },
  have_a_cat: {
    type: Sequelize.ENUM('no', 'yes')
  },
  tc_accepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  additional_notes: {
    type: Sequelize.STRING
  },
  profile_pic: {
    type: Sequelize.STRING
  }
})
module.exports = User
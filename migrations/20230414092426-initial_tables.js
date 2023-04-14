'use strict';

const Breed = require('../models/breed');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('users', {
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
    })

    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
    })

    await queryInterface.createTable('breeds', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
    })

    await queryInterface.createTable('dogs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
          type: Sequelize.STRING,
      },
      date_of_birth: {
          type: Sequelize.DATE
      },
      size: {
          type: Sequelize.ENUM('0-15lbs', '16-40lbs', '41-100lbs', '100+lbs')
      },    
      shedding_level: {
          type: Sequelize.ENUM('no shedding', 'moderate', 'alot')
      },
      house_trained: {
          type: Sequelize.ENUM('yes', 'work in progress', 'no')
      },
      can_be_left_alone: {
          type: Sequelize.ENUM('no', 'couple hours', 'a few hours')
      },
      spayed_neutered: {
          type: Sequelize.ENUM('no', 'yes')
      },
      good_with_cats: {
          type: Sequelize.ENUM('no', 'yes', 'unsure')
      },
      other_dog_size_compatibility: {
          type: Sequelize.ENUM('0-15lbs', '16-40lbs', '41-100lbs', '100+lbs')
      },
      profile_pic: {
          type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      breedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'breeds',
          key: 'id'
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    })
    
    await queryInterface.createTable('user_roles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      roleId: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
    })
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('dogs')
    await queryInterface.dropTable('breeds')
    await queryInterface.dropTable('user_roles')
    await queryInterface.dropTable('roles')
    await queryInterface.dropTable('users')
  }
};

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');

const Point = sequelize.define('point', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }            
    },
    points: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    approved_type: {
        type: Sequelize.ENUM('host', 'being hosted'),
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

module.exports = Point;
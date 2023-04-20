const  Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');

const Review = sequelize.define('review', {
    id: {
        type:  Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    source_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    target_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    review: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_live:  {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    dated: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = Review
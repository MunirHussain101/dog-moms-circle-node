const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const ReviewComments = sequelize.define('reviewComments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    review_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'reviews',
            key: 'id'
        }
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_live: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

module.exports = ReviewComments
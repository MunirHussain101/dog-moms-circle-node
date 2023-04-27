const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const User = require('./user')

const Hosting = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dated: {
        type: Sequelize.DATE,
        allowNull: false
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    hosted_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }

    },
    host_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
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


module.exports = Hosting
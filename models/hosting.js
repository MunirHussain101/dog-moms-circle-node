const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const User = require('./user')

const Hosting = sequelize.define('hosting', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    is_accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    is_rejected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
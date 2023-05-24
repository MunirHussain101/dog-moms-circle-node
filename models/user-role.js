const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const UserRole = sequelize.define("user_role", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    }
})
module.exports = UserRole
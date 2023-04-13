const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const UserRole = sequelize.define("user_role", {
    
})
UserRole.sync()
module.exports = UserRole
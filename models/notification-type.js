const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const NotificationType = sequelize.define('notification_type', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = NotificationType;
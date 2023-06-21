const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Notification = sequelize.define('notification', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  typeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'notifications_types',
      key: 'id'
    }
  },
  boardingId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'hostings',
      key: 'id'
    }
  },
  message: {
    type: Sequelize.STRING,
    allowNull: true
  },
  is_read: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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
})

module.exports = Notification
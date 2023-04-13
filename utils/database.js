const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('dogmomscircle', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost'
})

module.exports = sequelize
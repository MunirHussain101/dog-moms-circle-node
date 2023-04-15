const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('dogmomscircle', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: process.env.HOST, 
    port: process.env.DB_PORT
})

module.exports = sequelize

const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Breed = sequelize.define('breed', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = Breed
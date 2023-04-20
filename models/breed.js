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
// Breed.associate = (models) => {
//     console.log('inside')
//     Breed.hasMany(models.Dog)
// }
// Breed.hasMany(Dog)
module.exports = Breed
const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Breed = require('./breed')

const Dog = sequelize.define('dog', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    date_of_birth: {
        type: Sequelize.DATE
    },
    size: {
        type: Sequelize.ENUM('0-15lbs', '16-40lbs', '41-100lbs', '100+lbs')
    },    
    shedding_level: {
        type: Sequelize.ENUM('no shedding', 'moderate', 'alot')
    },
    house_trained: {
        type: Sequelize.ENUM('yes', 'work in progress', 'no')
    },
    can_be_left_alone: {
        type: Sequelize.ENUM('no', 'couple hours', 'a few hours')
    },
    spayed_neutered: {
        type: Sequelize.ENUM('no', 'yes')
    },
    good_with_cats: {
        type: Sequelize.ENUM('no', 'yes', 'unsure')
    },
    other_dog_size_compatibility: {
        type: Sequelize.ARRAY(Sequelize.ENUM('0-15lbs', '16-40lbs', '41-100lbs', '100+lbs'))
        // type: Sequelize.ARRAY(Sequelize.ENUM('a','b'))
    },
    profile_pic: {
        type: Sequelize.STRING
    },
    breedId: {
        type: Sequelize.INTEGER,
        references: {
            model: Breed,
            key: 'id',
            allowNull: true,
        }
    },
})

// Dog.associate = models => {
//     Dog.belongsTo(models.Breed);
// };

module.exports = Dog

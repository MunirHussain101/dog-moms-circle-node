const Sequelize = require('sequelize')
const Breed = require('../models/breed')
const Point = require('../models/point')
const Review = require('../models/review')
const User = require('../models/user')

const Op = Sequelize.Op

const getUsers = async({ zip_code, willing_travel_distance, time_period, dog_preferance }) => {
    // check that these conditions are not working, test it on zipCode first
    const userConditon = {
        is_verified: true,
        firstname: {
            [Op.not]: null
        },
        lastname: {
            [Op.not]: null
        },
        email: {
            [Op.not]: null
        },
        password: {
            [Op.not]: null
        },
        zipCode: {
            [Op.not]: null
        },
        phone: {
            [Op.not]: null
        },
        willing_travel_distance: {
            [Op.not]: null
        },
        activity_type: {
            [Op.not]: null
        },
        spay_neuter_prefes: {
            [Op.not]: null
        },
        shedding_prefs: {
            [Op.not]: null
        },
        house_training_prefs: {
            [Op.not]: null
        },
        dog_left_alone_prefs: {
            [Op.not]: null
        },
        have_a_cat: {
            [Op.not]: null
        },
        tc_accepted: {
            [Op.not]: null
        },
        profile_pic: {
            [Op.not]: null
        },
        
    }

    if(zip_code) userConditon.zipCode = zip_code
    if(willing_travel_distance) userConditon.willing_travel_distance = willing_travel_distance

    const users = await User.findAll({
        where: userConditon,
        attributes: ['id', 'firstname', 'lastname', 'zipCode', 'profile_pic'],
        include: [
            {
                model: Review,
                as: 'reviews',
                where: { is_live: true },
                required: false,
                attributes: [
                    "id",
                    "source_id",
                    "target_id",
                    "rating",
                    "review"
                ]
            },
            {
                model: Point,
                as: 'point',
                required: false,
                attributes: ['points']
            },
        ]
    })
    if (users.length) {
        users.forEach(user => {
            if (user.reviews.length) {
                const totalRating = user.reviews.reduce((acc, review) => acc + review.rating, 0);
                const avgRating = totalRating / user.reviews.length;
                user.dataValues.user_rating = avgRating;
            } else {
                user.dataValues.user_rating = 0;
            }
        });
    }
    return users;
}

const setReview = async(sourceId, targetId, rating, review) => {
    const reviewObj = await Review.create({
        source_id: sourceId,
        target_id: targetId,
        rating,
        review,
        is_live: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    })
    return reviewObj
}

const getBreeds = async() => {
    const breeds = await Breed.findAll({
        attributes: ['name']
    })
    const breedNames = breeds.map(breed => breed.name)
    return breedNames;
}

module.exports = {
    setReview,
    getBreeds,
    getUsers
}
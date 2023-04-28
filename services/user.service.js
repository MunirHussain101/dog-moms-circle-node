const Breed = require('../models/breed')
const Point = require('../models/point')
const Review = require('../models/review')
const User = require('../models/user')

const getUsers = async() => {
    const users = await User.findAll({
        where: {is_verified: true},
        attributes: ['id', 'firstname', 'lastname', 'zipCode'],
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
const Review = require('../models/review')

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

module.exports = {
    setReview,
}
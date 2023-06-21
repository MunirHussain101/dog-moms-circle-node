const Review = require("../models/review")
const ReviewComments = require("../models/review-comment")

const setReviewComments = async(review_id, comment, user_id) => {
    
    const reviewComment = await ReviewComments.create({
        review_id,
        comment,
        user_id,
        is_live: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
    })
    return reviewComment
}

const getReviews = async(userId) => {
    const reviews = await Review.findAll({
        where: {
            target_id: userId
        }
    })
    return reviews
}

module.exports = {
    setReviewComments,
    getReviews
}
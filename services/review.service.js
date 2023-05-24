const Point = require("../models/point")
const Post = require("../models/post")
const Review = require("../models/review")
const ReviewComments = require("../models/review-comment")
const User = require("../models/user")

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

module.exports = {
    setReviewComments
}
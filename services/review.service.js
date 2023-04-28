const Point = require("../models/point")
const Post = require("../models/post")
const Review = require("../models/review")
const ReviewComments = require("../models/review-comment")
const User = require("../models/user")

// const getPosts = async() => {
//     const posts = await Post.findAll({where: {
//         is_live: true
//     } , include: [
//         {
//             model: User,
//             where: {is_verified: true},
//             attributes: ['id', 'firstname', 'lastname', 'zipCode'],
//             include: { model: Review, as: 'reviews', where: { is_live: true }, required: false }
//         },
//     ]
//     })
//     if(!posts) throw new Error("No posts found")
//     return posts
// }

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
    // getPosts,
    setReviewComments
}
const { Op } = require("sequelize")
const ApiError = require("../helpers/ApiError")
const Point = require("../models/point")
const Post = require("../models/post")
const Review = require("../models/review")
const User = require("../models/user")

const getPosts = async() => {
    const posts = await Post.findAll({
        where: {
            is_live: true,
            end_date: { [Op.gte]: new Date() }
        },
        include: [{
            model: User,
            where: {is_verified: true},
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
                { model: Point, as: 'point', required: false, attributes: ['points'] }
            ]
        }],
        attributes: {exclude: ['is_live', 'createdAt', 'updatedAt', 'deletedAt']}
    })

    if(!posts) throw new Error("No posts found")
    posts.forEach(post => {
        if(post.user.reviews && post.user.reviews.length) {
            const  totalRating = post.user.reviews.reduce((acc, review) => acc + review.rating, 0);
            const avgRating = totalRating / post.user.reviews.length;
            post.user.dataValues.user_rating = avgRating
        } else {
            post.user.dataValues.user_rating = 0;
        }
    })
    return posts
}

const createPost = async({user_id, additional_info, start_date, end_date, is_live}) => {
    const postExists = await Post.findOne({
        where: {
            userId: user_id,
            deletedAt: null,
            end_date: { [Op.gte]: new Date() }
        }
    })
    if(postExists) throw new ApiError(409, "You already have a live post")
    const post = await Post.create({
        userId: user_id,
        additional_info,
        start_date,
        end_date,
        is_live,
        created_at: new Date(),
        updated_at:new Date(),
        deleted_at:null
    })
    return post
}

module.exports = {
    getPosts,
    createPost
}
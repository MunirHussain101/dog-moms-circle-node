const Point = require("../models/point")
const Post = require("../models/post")
const Review = require("../models/review")
const User = require("../models/user")

const getPosts = async() => {
    const posts = await Post.findAll({where: {
        is_live: true
    } , include: [
        {
            model: User,
            where: {is_verified: true},
            attributes: ['id', 'firstname', 'lastname', 'zipCode'],
            include: { model: Review, as: 'reviews', where: { is_live: true }, required: false }
        },
    ]
    })
    if(!posts) throw new Error("No posts found")
    return posts
}

const createPost = async({user_id, additional_info, start_date, end_date, is_live}) => {
    // const user = await User.findOne({})
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
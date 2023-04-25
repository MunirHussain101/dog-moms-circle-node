const Point = require("../models/point")
const Post = require("../models/post")
const Review = require("../models/review")
const User = require("../models/user")

const getPosts = async() => {
    const posts = await Post.findAll({include: [
        {
            model: User,
            include: Point
        },
    ]})
    // posts.dataValues.reviews = []
    // const reviews = await Review.findAll({where: {
    //     target_id: posts
    // }})
    if(!posts) throw new Error("No posts found")
    return posts
}

const createPost = async({user_id, start_date, end_date, is_live}) => {
    const post = await Post.create({
        userId: user_id,
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
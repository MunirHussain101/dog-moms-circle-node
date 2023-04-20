const Point = require("../models/point")
const Post = require("../models/post")
const User = require("../models/user")

const getPosts = async() => {
    const posts = await Post.findAll({include: [
        {
            model: User,
            include: Point
        }
    ]})
    if(!posts) throw new Error("No posts found")

    // const users = await User.findAll()
    // if(!users) throw new Error("No users found")
    
    // posts.forEach(post => {
    //     const user = users.find(user => user.id === post.user_id)
    //     // post.user = user
    //     post.temp = '=========>>>>>>'
    // })
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
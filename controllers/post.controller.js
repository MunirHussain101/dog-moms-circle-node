const jwt = require('jsonwebtoken')
const config = require('../app/config/auth.config')

const postService = require('../services/post.service')
const userService = require('../services/user.service')

exports.getPosts = async (req, res, next) => {
    try {
        const data = await postService.getPosts()
        const users = await userService.getUsers()
        res.json({posts: data, allUsers: users})
    } catch (err) {
        next(err)
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { additional_info, start_date, end_date } = req.body
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!start_date) throw new Error('Start date not defined in body')
        if(!end_date) throw new Error('End date not defined in body')
        if(!additional_info) throw new Error('Additional info not defined in body')
        if(!token) throw new Error('Token not defined in header')

        const {id: user_id} = await jwt.verify(token, config.secret)
        const post = await postService.createPost({ user_id, additional_info, start_date, end_date, is_live: true })
        res.json(post)
    } catch(err) {
        next(err)
    }
}

// exports.getPosts = async(req, res, next) => {
//     try {
//       const res = await postService.getPosts()
//       res.json(res)
//     } catch(err) {
//       next(err)
//     }
// }
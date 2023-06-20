const jwt = require('jsonwebtoken')
const config = require('../app/config/auth.config')

const postService = require('../services/post.service')
const userService = require('../services/user.service')

exports.getPosts = async (req, res, next) => {
    try {
        const { zip_code, willing_travel_distance, time_period, dog_preferance } = req.body
        const data = await postService.getPosts({ zip_code, willing_travel_distance, time_period, dog_preferance })
        const users = await userService.getUsers({ zip_code, willing_travel_distance, time_period, dog_preferance })
        res.json({posts: data, allUsers: users})
    } catch (err) {
        next(err)
    }
}
exports.getPost = async (req, res, next) => {
    try {
        const {id} = req.query
        const post = await postService.getPost(id)
        res.json(post)
    } catch(err) {
        next(err)
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { start_date, end_date } = req.body
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!start_date) throw new Error('Start date not defined in body')
        if(!end_date) throw new Error('End date not defined in body')
        // if(!additional_info) throw new Error('Additional info not defined in body')
        if(!token) throw new Error('Token not defined in header')

        const {id: user_id} = await jwt.verify(token, config.secret)
        const post = await postService.createPost({ user_id, start_date, end_date, is_live: true })
        res.json(post)
    } catch(err) {
        console.log('error happend bro')
        next(err)
    }
}

exports.isUserInfoComplete = async (req, res, next) => {
    const {id} = req.params
    try {
        await postService.checkData(id)
        res.json(true)
    } catch(err) {
        console.log({err});
        res.json(false)
    }
}

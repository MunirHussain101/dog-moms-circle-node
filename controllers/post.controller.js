const postService = require('../services/post.service')

exports.getPosts = async (req, res, next) => {
    try {
        const data = await postService.getPosts()
        res.json(data)
    } catch (err) {
        next(err)
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { user_id, start_date, end_date } = req.body
        const post = await postService.createPost({ user_id, start_date, end_date, is_live: true })
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
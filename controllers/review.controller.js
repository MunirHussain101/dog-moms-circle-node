const jwt = require('jsonwebtoken')

const userService = require('../services/user.service')
const config = require("../app/config/auth.config");
const ApiError = require('../helpers/ApiError');
const reviewService = require('../services/review.service')
const io = require('../socket')

exports.setReview = async (req, res, next) => {
    try {
        const targetId = req.params.targetId
        const {rating, review} = req.body
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if(!targetId) throw new Error('Target user Id not defined in the url')
        if(!rating) throw new Error('Rating not defined in body')
        if(!review) throw new Error('Review not defined in body')
        if(!token) throw new Error('Token not defined in header')

        const {id: sourceId} = await jwt.verify(token, config.secret)
        const response = await userService.setReview(sourceId, targetId, rating, review)
        
        io.getIO().emit("new-review", { targetId, rating, review }); // Emit the notification event
        res.json(response)
    } catch(err) {
        next(err)
    }
}

exports.setReviewComments = async(req, res, next) => {
    try {
        const {reviewId, comment} = req.body
        
        if(!reviewId) throw new ApiError(404, "Review id not provided")
        if(!comment) throw new ApiError(404, "Comment not provided")

        const result = await reviewService.setReviewComments(reviewId, comment, req.user.id)
        res.json(result)
    } catch(err) {
        next(err)
    }
}
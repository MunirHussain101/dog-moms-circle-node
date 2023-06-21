const jwt = require('jsonwebtoken')

const userService = require('../services/user.service')
const config = require("../app/config/auth.config");
const ApiError = require('../helpers/ApiError');
const reviewService = require('../services/review.service')
const io = require('../socket');
const Notification = require('../models/notification');
const NotificationType = require('../models/notification-type');

const { REVIEW } = require('../utils/enums');
const User = require('../models/user');

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

        const targetSocketId = io.getClients()[targetId]
        if(targetSocketId) {
            const type = await NotificationType.findOne({where: {name: REVIEW}})
            const user = await User.findOne({where: {id: sourceId}})
            const notification = await Notification.create({
                userId: targetId,
                typeId: type.id,
                message: `${user.firstname} ${user.lastname} commented on your post`
            })
            io.getIO().to(targetSocketId).emit("new-review", {
                id: targetSocketId,
                targetId,
                rating,
                review,
                typeId: type.id,
                message: `${user.firstname} ${user.lastname} commented on your post`
            }); // Emit the notification event
        }
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

exports.getReviews = async(req, res, next) => {
    try {
        const {id: userId} = req.params
        if(!userId) throw new ApiError(404, "User id not provided")
        const result = await reviewService.getReviews(userId)
        res.json(result)
    } catch(err) {
        next(err)
    }
}
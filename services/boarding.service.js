const ApiError = require("../helpers/ApiError")
const Point = require("../models/point")
const Hosting = require('../models/hosting')
const { POINTS } = require("../utils/getPoints")
const sequelize = require("../utils/database")
const io = require('../socket')
const User = require("../models/user")
const Post = require("../models/post")
const { Op, Sequelize } = require("sequelize")

const updateBoardingStatus = async(boardingId, action, myId, side) => {
    let transaction = await sequelize.transaction()

    const boarding = await Hosting.findByPk(boardingId, { transaction })
    if(!boarding) throw new ApiError(404, 'Boarding not found.')

    if(action === false) {
        boarding.is_rejected = !action
        boarding.is_accepted = action
        await boarding.save({ transaction })
        transaction.commit()
        const idToSendEvent = myId !== boarding.hosted_user_id ? boarding.hosted_user_id : boarding.host_user_id
        const targetSocketId = io.getClients()[idToSendEvent]
        const myData = await User.findOne({where: {id: myId}})
        if(targetSocketId) {
            io.getIO().to(targetSocketId).emit('reject-request', {
                message: `${myData?.firstname} ${myData?.lastname} rejected your request.`,
                type: 3
            })
        }
        return {message: 'Request rejected successfully.', statusCode: 204}
    }
    
    const {hosted_user_id: target_id, host_user_id: id } = boarding
    
    const targetPoint = await Point.findOne({
        where: {
            userId: target_id
        },
        transaction
    })

    if(targetPoint.points < POINTS) {
        throw new ApiError(400, 'Insufficent Points for client to board')
    }

    const point = await Point.findOne({
        where: {
            userId: id
        },
        transaction
    })
    await Point.update(
        { points: targetPoint.points - POINTS },
        {
            where: {
                id: target_id
            },
            transaction
        }
    )
    await Point.update(
        { points: point.points + POINTS },
        {
            where: {
                id: id
            },
            transaction
        }
    )
    boarding.is_accepted = action
    boarding.is_rejected = !action
    await boarding.save({transaction})
    transaction.commit()
    // const idToSendEvent = myId === boarding.hosted_user_id ? boarding.host_user_id : boarding.hosted_user_id
    // const targetSocketId = io.getClients()[idToSendEvent]
    const targetSocketId = io.getClients()[myId]
    const idToSendEvent = myId === boarding.hosted_user_id ? boarding.host_user_id : boarding.hosted_user_id
    const targetSocketId2 = io.getClients()[idToSendEvent]
    
    if(targetSocketId) {
        const myData = await User.findOne({where: {id: myId}})
        const otherUser = await User.findOne({where: {id: idToSendEvent}})
        const congrats_msg1 = side
            ? `CONGRATULATIONS! YOUR DOG WILL BE HOSTED BY ${otherUser.firstname} ${otherUser.lastname} FOR 10 POINTS`
            : `CONGRATULATIONS! YOU HAVE EARNED 10 POINTS FOR HOSTING ${otherUser.firstname} ${otherUser.lastname}`
            const congrats_msg2 = side
            ? `CONGRATULATIONS! YOU HAVE EARNED 10 POINTS FOR HOSTING ${myData.firstname} ${myData.lastname}`
            : `CONGRATULATIONS! YOUR DOG WILL BE HOSTED BY ${myData.firstname} ${myData.lastname} FOR 10 POINTS`
        io.getIO().to(targetSocketId).emit('accept-request', {
            user: myData,
            type: 3,
            // message: `${otherUser.firstname} ${otherUser.lastname} accepted your request`,
            congrats_msg: congrats_msg1
        })
        io.getIO().to(targetSocketId2).emit('accept-request', {
            user: otherUser,
            type: 3,
            message: `${myData.firstname} ${myData.lastname} accepted your request`, // this is the message for the one who has accepted the request,
            // think about it if it is needed, if yes then think about what message is needed here.
            congrats_msg: congrats_msg2
        })
    }
    return { message: 'Request accepted successfully.', statusCode: 200}
}

const requestBoarding = async(id, target_id) => {
    console.log('boarding');
    const hosting = await Hosting.create(
        {
            start_date: new Date(),
            end_date: new Date(),
            hosted_user_id: target_id,
            host_user_id: id,
            updatedAt: new Date(),
        }
    )
    if(hosting) {
        console.log('ab');
        const user = await User.findOne({
            where: {
                id
            }
        })
        if(!user) throw new ApiError(404, 'No user with this ID is found.')
        const targetSocketId = io.getClients()[target_id]
        console.log({targetSocketId});
        if(targetSocketId) {
            const notificationId = Date.now()+''
            io.getIO().to(targetSocketId).emit('request', {
                id: targetSocketId,
                message: `${user.firstname} ${user.lastname} sent you a request`,
                user,
                hosting,
                boardingId: hosting.id,
                type: 4,
                notificationId
            })
        }
    }
    return {hosting}
}

const getBookings = async(id, host) => {
    const condition = {deletedAt: null }
    if(host) condition.host_user_id = id
    else condition.hosted_user_id = id
    const hostings = await Hosting.findAndCountAll({
        where: condition,
        include: [
            { model: User, as: 'hostedUser', foreignKey: 'hosted_user_id' },
            { model: User, as: 'hostUser', foreignKey: 'host_user_id' },
        ],
        attributes: {
            include: [
              [
                Sequelize.literal(`CASE WHEN "end_date" < CURRENT_TIMESTAMP THEN 'completed' ELSE 'inprogress' END`),
                'status',
              ],
            ],
        },
        order:[['end_date', 'DESC']]
    })
    return hostings
}

const checkBoarding = async(myId, targetId) => {
    const post = await Post.findOne({
        where: {
            userId: myId,
            is_live: true,
            end_date: {[Op.gt]: new Date()}
        }
    })
    if(post) {
        return true
    }
    return false
    // const boarding = await Hosting.findOne({
    //     where: {
    //         is_accepted: false,
    //         is_rejected: false,
    //         host_user_id: myId,
    //         hosted_user_id: targetId
    //     }
    // })
    // if(boarding) {
    //     return true
    // }
    // const notBoarding = await Hosting.findOne({
    //     where: {
    //         is_accepted: false,
    //         is_rejected: false,
    //         host_user_id: targetId,
    //         hosted_user_id: myId
    //     }
    // })
}

module.exports = {
    updateBoardingStatus,
    requestBoarding,
    checkBoarding,
    getBookings
}
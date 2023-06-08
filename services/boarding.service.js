const ApiError = require("../helpers/ApiError")
const Point = require("../models/point")
const Hosting = require('../models/hosting')
const { POINTS } = require("../utils/getPoints")
const sequelize = require("../utils/database")

const updateBoardingStatus = async(boardingId, action) => {
    // put all of this in a transaction
    let transaction = await sequelize.transaction()

    const boarding = await Hosting.findByPk(boardingId, { transaction })
    if(!boarding) throw new ApiError(404, 'Boarding not found.')

    if(action === false) {
        boarding.is_rejected = !action
        boarding.is_accepted = action
        await boarding.save({ transaction })
        return
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

    const res = await Point.update(
        { points: targetPoint.points - POINTS },
        {
            where: {
                id: target_id
            },
            transaction
        }
    )
    console.log(typeof POINTS);
    console.log(point.points + POINTS);

    const res2 = await Point.update(
        { points: point.points + POINTS },
        {
            where: {
                id: id
            },
            transaction
        }
    )

    // 
    boarding.is_accepted = action
    boarding.is_rejected = !action
    await boarding.save({transaction})
    transaction.commit()
    return { res, res2 }
}

const requestBoarding = async(id, target_id) => {
    const hosting = await Hosting.create(
        {
            start_date: new Date(),
            end_date: new Date(),
            hosted_user_id: target_id,
            host_user_id: id,
            updatedAt: new Date(),
        }
    )
    return {hosting}
}

module.exports = {
    updateBoardingStatus,
    requestBoarding
}
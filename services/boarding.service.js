const ApiError = require("../helpers/ApiError")
const Point = require("../models/point")

const POINTS = 20

const board = async(id, target_id) => {
    const targetPoint = await Point.findOne({
        where: {
            userId: target_id
        }
    })

    if(targetPoint.points < POINTS) {
        throw new ApiError(400, 'Insufficent Points for client to board')
    }

    const point = await Point.findOne({
        where: {
            userId: id
        }
    })
    console.log(point.points);
    const res = await Point.update(
        {points: targetPoint.points - POINTS},
        {where: {
            id: target_id
        }}
    )
    const res2 = await Point.update(
        {points: point.points + POINTS},
        {where: {
            id: id
        }}
    )
    return {res,res2}
}
module.exports = {
    board,
}
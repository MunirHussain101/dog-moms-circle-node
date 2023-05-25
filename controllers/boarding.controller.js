const ApiError = require('../helpers/ApiError');
const boardingService = require('../services/boarding.service')

exports.board = async (req, res, next) => {
  try {
    const {id} = req.user
    const {targetId} = req.body
    if(!id) throw new ApiError(400, 'jwt token not defined')
    const data = await boardingService.board(id, targetId)
    res.json(data)
  } catch (error) {
    next(error);
  }
};
const ApiError = require('../helpers/ApiError');
const boardingService = require('../services/boarding.service')

exports.board = async (req, res, next) => {
  try {
    const { id } = req.user
    const { targetId } = req.body
    if(!id) throw new ApiError(400, 'jwt token not defined')
    const data = await boardingService.requestBoarding(id, targetId)
    res.json(data)
  } catch (error) {
    next(error);
  }
};

exports.updateBoardingStatus = async (req, res, next) => {
  try {
    const { id, action, myId, side } = req.body
    if(!id) throw new ApiError(404, 'Please specify a boarding id.')
    if(!myId) throw new ApiError(404, 'No User found with given id.')
    if(action !== true && action !== false) throw new ApiError(400, 'action should be either true or false.')
    const data = await boardingService.updateBoardingStatus(id, action, myId, side)
    res.json(data)
  } catch(err) {
    next(err)
  }
}

exports.getBookings = async (req, res, next) => {
  try {
    const { id, host } = req.body
    if(!id) throw new ApiError(400, 'No id defined')
    const data = await boardingService.getBookings(id, host)
    res.json(data)
  } catch(err) {
    next(err)
  }
}

exports.checkBoarding = async (req, res, next) => {
  try {
    const {myId, targetId} = req.body
    if(!myId) throw new ApiError(400, 'id not defined.')
    const data = await boardingService.checkBoarding(myId, targetId)
    console.log({'data------------>': data})
    res.json(data)
  } catch(err) {
    next(err)
  }
}

// exports.requestBoarding = async (req, res, next) => {
//   try {
//     const { id } = req.user
//     const { targetId } = req.body
//     if(!id) throw new ApiError(400, 'jwt token not defined')
//     const data = await boardingService.board(id, targetId)
    
//   }
// }
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
    const { id, action } = req.body
    if(!id) throw new ApiError(404, 'Please specify a boarding id')
    if(action !== true && action !== false) throw new ApiError(400, 'action should be either true or false.')
    const data = await boardingService.updateBoardingStatus(id, action)
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
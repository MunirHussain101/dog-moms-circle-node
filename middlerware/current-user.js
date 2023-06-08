const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../app/config/auth.config')

exports.setCurrentUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    // if(!token) throw new Error('Token not defined in header')
    if(token) {
        try {
            const {id} = jwt.verify(token, config.secret)
            const user = await User.findOne({
                where: {
                    id: id
                }
            })
            req.user = user
        } catch(err) {
            next(err)
        }
    }
    next()
}
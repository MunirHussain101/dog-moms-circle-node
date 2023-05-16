const Hosting = require("../models/hosting");

 const createHosting = async(body) => {
    const {dated,start_date,end_date,hosted_user_id, host_user_id,} = body;

    const hosting = await Hosting.create({
        dated: new Date(),
        start_date: new Date(),
        end_date: new Date(),
        hosted_user_id: 2,
        is_accepted: false,
        host_user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    return  hosting;
}

 const getRequest = async(senderId,receiverId) => {
    const hosting = await Hosting.findOne({
        where : {
            hosted_user_id : senderId,
            host_user_id : receiverId,
        }
    })
    if(!hosting){
        return null
    }
    return hosting;

}

module.exports = {
    createHosting,
    getRequest
}
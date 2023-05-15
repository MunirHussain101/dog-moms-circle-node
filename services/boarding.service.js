const Hosting = require("../models/hosting");

 const createHosting = async(body) => {
    const {dated,start_date,end_date,hosted_user_id, is_accepted, host_user_id,createdAt, updatedAt} = body;

    const hosting = new Hosting(dated,start_date,end_date,hosted_user_id,is_accepted,host_user_id,createdAt,updatedAt)
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
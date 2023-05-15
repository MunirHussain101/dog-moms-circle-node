const Hosting = require("../models/hosting")
const { createHosting, getRequest } = require("../services/boarding.service")



exports.createBoardingRequest = async(req,res,next) => {
    try{
        let hosting = await createHosting(req.body);
        await hosting.save();
        res.status(200).json(await hosting.get())
    }
    catch(e) {
        next(e)
    }
}

exports.approveBoardingRequest = async(req,res,next) => {
    try{
    let {senderId, receiverId} = req.body;

    let hostingData = await getRequest(senderId,receiverId);

    if(!hostingData || hostingData === null){
        res.status(404).json({
            message : "no data found"
        })
    }
    else{
        hostingData.is_accepted = true;
        await hostingData.save()
        res.status(200).json({
            data : await hostingData.get()
        })
    }

}
catch(e){
    next(e)
}

}

exports.deleteBoardingRequest = async(req,res,next) => {
    try{
    let {senderId, receiverId} = req.body;

    let hostingData = await getRequest(senderId,receiverId);

    if(!hostingData || hostingData === null){
        res.status(404).json({
            message : "no data found"
        })
    }
    else{
        let date = new Date();
        
        hostingData.deletedAt = date;
        await hostingData.save()
        res.status(200).json({
            data : await hostingData.get()
        })
    }
    }
    catch(e){
        next(e)
    }
}
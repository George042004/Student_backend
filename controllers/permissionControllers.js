const Permission = require('../models/permissionModels')


async function permission(req,res){
    const {name,roll,email,phone,request} = req.body 
    const added = await Permission.create({name,roll,email,phone,reason:request})
    if(!added)
    {
        return res.json({status:false,message:"unable to send request!"})
    }
    return res.json({status:true,message:"Request sent!"})
}

async function getRequests(req,res){
    const requests = await Permission.find()
    if(!requests)
    {
        return res.json({status:false,message:"No permission requests available now!"})
    }
    return res.json({status:true,message:requests})
}


module.exports = {permission,getRequests}
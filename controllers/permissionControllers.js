const Permission = require('../models/permissionModels')


async function permission(req,res){
    const {name,roll,email,phone,request} = req.body 
    const added = await Permission.create({
        name:name,
        roll:roll,
        email:email,
        phone:phone,
        reason:request})
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


async function reqStatusUpdate(req,res){
    const {reqStatus,roll,reason} = req.body 
    const update = await Permission.updateOne({roll:roll, reason:reason},{$set:{reqStatus:reqStatus}})
    if(!update)
    {
        return res.json({status:false,message:"Unable to update"})
    }
    return res.json({status:true})
}


async function myReq(req,res)
{
    const email = req.user.roll
    const reqst = await Permission.find({$or:[{roll:email},{email:email}]})
    if(!reqst)
    {
        return res.json({status:false})
    }
    return res.json({status:true, message:reqst})

}


module.exports = {permission,getRequests,reqStatusUpdate,myReq}
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

//            const res = await axios.put('https://student-backend-fe9r.onrender.com/request/updateReq',{

async function reqStatusUpdate(req,res){
    const {reqStatus,roll} = req.body 
    const update = await Permission.updateOne({roll:roll},{$set:{reqStatus:reqStatus}})
    if(!update)
    {
        return res.json({status:false,message:"Unable to update"})
    }
    return res.json({status:true})
}


module.exports = {permission,getRequests,reqStatusUpdate}
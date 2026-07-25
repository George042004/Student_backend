const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY 

function auth(req,res,next){
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.json({status:false,message:"Unauthorized access"})
    }
    try{
        const dec = jwt.verify(token,SECRET_KEY)
        req.user = dec 
        next()
    }
    catch(e)
    {
        return res.json({status:false, message:e.message})
    }
}


module.exports = auth
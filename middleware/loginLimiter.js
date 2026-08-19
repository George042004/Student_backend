const rateLimit = require('express-rate-limit')


const Limiter = rateLimit({
    windowMs:15*60*1000,
    max:5,
    handler:(req,res)=>{
        res.status(429).json({
            message:"Too many login attempts. Please try again later."
        })
    }
})


module.exports = Limiter
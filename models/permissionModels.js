const mongoose = require('mongoose')

const permissionSchema = mongoose.Schema({

    name:String, 
    roll:String,
    email:String,
    phone:String,
    reason:String,
    reqStatus:{
        type:String,
        default:'pending'
    }

},{timestamps:true})


module.exports = mongoose.model("Permission",permissionSchema)
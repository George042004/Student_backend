const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    
    name:{type:String, required:true},
    roll:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:Number, required:true},
    password:{type:String, required:true},
    img:{type:String}

},{timestamps:true})

module.exports = mongoose.model("users",userSchema)
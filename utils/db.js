const mongoose = require('mongoose')
require('dotenv').config()

function db(){
    // mongodb://localhost:27017
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("database is connected")
    })
    .catch((e)=>{
        console.log("Unable to connect DB",e)
    })
}

module.exports = db
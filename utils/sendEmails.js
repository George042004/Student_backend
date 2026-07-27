const nodemailer = require('nodemailer')
require('dotenv').config()
const email = process.env.EMAIL 
const password = process.env.PASS

const transporter =nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:email,
        pass:password
    }
});

if(transporter){
    console.log("Email connected")
}
else{
    console.log("Email not connected")
}

module.exports = transporter

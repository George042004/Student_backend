const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter =nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
});

async function verify(){
   try{
    await transporter.verify();
    console.log("Mail server Connected");
   }
    catch(e){
        console.log("Error: ",e);
    }
}

verify();
module.exports = transporter

const nodemailer = require('nodemailer')
require('dotenv').config()


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  connectionTimeout:10000,
  greetingTimeout:10000,
  socketTimeout:10000,
  family:4,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

async function verify(){
      console.log('Checking mail server...')

   try{
    await transporter.verify();
    console.log("Mail server Connected");
   }
    catch(e){
        console.log("Mail server Error: ",e);
    }
}

verify();
module.exports = transporter

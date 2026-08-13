const nodemailer = require('nodemailer')
require('dotenv').config()

console.log('EMAIL:',process.env.EMAIL)
console.log('PASS exists:',!!process.env.PASS)

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
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

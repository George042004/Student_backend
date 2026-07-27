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

transporter.verify((e, s) => {
  if (e) {
    console.error("Mail connection failed:", e);
  } else {
    console.log("Mail server is ready");
  }
});

module.exports = transporter

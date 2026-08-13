const {Resend} = require('resend')
require('dotenv').config()

const resend = new Resend(process.env.API_KEY)

module.exports = resend

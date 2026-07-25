const cloudinary = require('cloudinary').v2
require('dotenv').config()

const cloudname = process.env.CLOUDNAME 
const apikey = process.env.APIKEY 
const apisecret = process.env.APISECRET


cloudinary.config({
    cloud_name:cloudname,
    api_key:apikey,
    api_secret:apisecret
})

module.exports = cloudinary
const express = require('express')
const cors = require('cors')
const db = require('./utils/db')
const parser = require('body-parser')
const permissionroute = require('./routes/permissionRoutes')
const userRoutes = require('./routes/userRoutes')
const path = require('path')
require('dotenv').config()

const server = express()
server.use(cors())
server.use(parser.json())
server.use(express.json())
server.use('/users',userRoutes)
// server.use('/resumes',require('./routes/resumeRoutes'))
server.use('/request',permissionroute)

server.use('/uploads',express.static(path.join(__dirname,'uploads')))

db()

const PORT = process.env.PORT

server.listen(PORT,()=>{
    console.log("server is running at 1234 port");
    
})
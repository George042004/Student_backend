const express = require('express')
const userControllers = require('../controllers/userControllers')
const uploads = require('../middleware/multer')
const auth = require('../middleware/auth')
// require('dotenv').config()

const routes = express.Router()

routes.post('/register',uploads.single('img'),userControllers.register)
routes.post('/login',userControllers.login)
routes.get('/getdata',auth,userControllers.getdata)
routes.post('/resetpass',auth,userControllers.resetpass)
routes.get('/students',auth,userControllers.getstudents)
routes.delete('/delete/:roll',userControllers.del)
routes.put('/update',auth,userControllers.update)
routes.post('/otp',userControllers.otpfun)
routes.post('/verify',userControllers.verify)
routes.put('/changepassword',userControllers.updatepassword)

module.exports = routes
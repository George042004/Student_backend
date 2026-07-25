const multer = require('multer')
const  {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'students',
        allowed_formats:['jpg','jpeg','png']
    }
})


// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'uploads/')
//     },

//     filename:function(req,file,cb){
//         cb(null,Date.now()+'-'+file.originalname)
//     }
// })

const uploads = multer({storage:storage})

module.exports = uploads
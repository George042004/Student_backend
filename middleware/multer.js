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


const resumeStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "student_resumes",
        allowed_formats: ["pdf"],
        resource_type: "raw"
    }
});

const uploadResume = multer({ storage: resumeStorage });
const uploads = multer({storage:storage})


module.exports = {uploads, uploadResume};


// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'uploads/')
//     },

//     filename:function(req,file,cb){
//         cb(null,Date.now()+'-'+file.originalname)
//     }
// })

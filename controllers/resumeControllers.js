// const users = require('../models/userModels')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const auth = require('../middleware/auth')
// const transporter = require('../utils/sendEmails')
// require('dotenv').config()




// async function uploadResume(req, res) {
//     try {
//         const roll = req.user.roll; 
//         const resumeFind = await Resume.findOne({$or: [{roll:roll},{email:roll}]});
//         if(resumeFind) {
//             return res.json({status:false, message:"Resume already uploaded"});
//         }   
//         const resume = await Resume.create({email: roll, url: req.file.path, publicId:req.file.filename});
//         return res.json({status:true, message:"Resume uploaded successfully"});
//     }
//     catch(e) {
//         return res.json({status:false, message:e.message});
//     }   


// }

// module.exports = {uploadResume}
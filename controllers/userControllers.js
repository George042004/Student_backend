const users = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const transporter = require('../utils/sendEmails')
require('dotenv').config()




async function register(req,res){
    try
    {
        let {name,roll,email,phone,password,img} = req.body
        if(roll) roll = roll.toLowerCase()
        if(email) email = email.toLowerCase()
            
        const userExist = await users.findOne({$or:[{roll},{email}]})
        if(userExist)
        {
            return res.json({status:false,message:"user already exist"})
        }
        const hashpass = await bcrypt.hash(password,10)
        const ans = await users.create({name,roll,email,phone,password:hashpass,img:req.file? req.file.path:null})
        
        await transporter.sendMail({
            from:`'Student Management System' <${process.env.EMAIL}>`,
            to:`${email}`,
            subject:"Registered successfully🎉",
            html:`<h3>Hello, ${name}.</h3><br/><p>You have registered successfully for student management system.</p>`
        })
        res.json({status:true, message:"User Registered successfully!"})
        console.log("Email sent successfully");
    }

    catch(e)
    {
        return res.json({status:false,message:e.message})
    }
}



async function login(req,res){
   
try{

    const {roll,password} = req.body 
    const user = await users.findOne({$or:[{roll:roll.toLowerCase()},{email:roll.toLowerCase()}]})
    if(!user){
        return res.json({status:false, message:"user not found"})
    }
    const pass = await bcrypt.compare(password,user.password)
    if(!pass)
    {
        // await transporter.sendMail({
        //     from:`${process.env.EMAIL}`,
        //     to:`${user.email}`,
        //     subject:'Someone trying to login your account'
        // })
        return res.json({status:false, message:"Incorrect password !"})
    }
    const token = await jwt.sign({
          roll:roll
        },process.env.SECRET_KEY,
        {
            expiresIn:'2h'
        }) 
    const id = user._id
    return res.json({status:true, message:"Logged in successfully!",token,id})

    }

    catch(e)
    {
        return res.json({status:false,message:e.message})
    }


}


async function getdata(req,res){

    try{
        const roll = req.user.roll

    if(!roll)
    {
        return res.json({status:false,message:"user not found"})
    }
    const user = await users.findOne({$or:[{email:roll},{roll:roll}]})
    return res.json({status:true,message:{roll: user.roll,name: user.name,img: user.img, email:user.email,phone:user.phone}})
    }
    catch(e)
    {
        return res.json({status:false,message:e.message})
    }

}

async function resetpass(req,res){
    const roll = req.user.roll 
    const userexist = await users.findOne({$or:[{roll:roll},{email:roll}]})
    if(userexist)
    {
        const {password,password1} = req.body
        const originalpass = await bcrypt.compare(password, userexist.password)
        if(!originalpass)
        {
            return res.json({status:false,message:"Incorrect password entered"})
        }
        await users.updateOne({$or:[{roll:roll},{email:roll}]},{password: await bcrypt.hash(password1,10) })
        return res.json({status:true, message:"password changed"})
    }
    return res.json({status:false, message:"unable to password changed"})
}


async function getstudents(req, res) {
    const input = req.query.input || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const sort = req.query.sort;

    const total = await users.countDocuments();

    let query = {};
    let sorting = {};

    if (input) {
        query = {
            $or: [
                { name:{ $regex:input, $options:"i" } },
                { roll:{ $regex:input, $options:"i" } }
            ]
        };
    }

    if (sort==="az") {
        sorting = { name: 1 };
    }
    else if (sort==="za") {
        sorting = { name: -1 };
    }
    else if (sort==="newest") {
        sorting = { createdAt: -1 };
    }
    else if (sort==="oldest") {
        sorting = { createdAt: 1 };
    }

    const data = await users
        .find(query)
        .sort(sorting)
        .skip(skip)
        .limit(limit)
        .select("name roll email phone img");

    res.json({
        status: true,
        message: data,
        totalpages: Math.ceil(total / limit)
    });
}



async function del(req,res){
    const roll = req.params.roll 
    const dell = await users.findOneAndDelete({roll:roll})
    if(dell){
        return res.json({status:true, message:"Student deleted"})
    }
    return res.json({status:false, message:"unable to delete"})
}



async function update(req,res) {
    const {roll,name,email,phone} = req.body 
    const result = await users.updateOne({roll:roll},{$set:{name:name,email:email,phone:phone}})

    if(result)
    {
        return res.json({status:true, message:"Student Details Updated"})
    }
    return res.json({status:false, message:"unable to update"})
    
}


//otp variable
let otp;

async function otpfun(req,res){
    const {email} = req.body 
    const exist = await users.findOne({email:email})
    if(!exist)
    {
        return res.json({status:false,message:'user not exist'})
    }
    else{
        otp = Math.floor(100000+Math.random()*457841)
        await transporter.sendMail({
            from:`${process.env.EMAIL}`,
            to:`${email}`,
            subject:'OTP',
            text:`Your OTP is ${otp}. Dont't share your OTP to anyone.`
        })
        return res.json({status:true, message:"OTP sent"})
    } 
}


async function verify(req,res){
    const {sentotp,email} = req.body
    // console.log(Number(otp)===Number(sentotp))
    const exist = await users.findOne({email})
    if(Number(sentotp) === Number(otp))
    {

        return res.json({status:true, message:'otp verified!'})
    }
    else{
        return res.json({status:false, message:'otp is not matched'})
    }

}


async function updatepassword(req,res){

    const {email,password} = req.body
    const hashpass = await bcrypt.hash(password,10)
    const ok = await users.updateOne({email:email},{$set:{password:hashpass}})
    if(ok){
        return res.json({status:true,message:"password updated"})
    }
    return res.json({status:false, message:"unable to change password"})
}





module.exports = {register, login, getdata, resetpass, getstudents, del, update, otpfun, verify, updatepassword}

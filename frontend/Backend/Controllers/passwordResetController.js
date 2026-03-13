import userModel from "../models/userModel.js";
import passwordResetModel from "../models/passwordResetModel.js";
import nodemailer from "nodemailer";
const passwordResetController=async(req,res)=>{
    const{email}=req.body;
    try{
        const normalizedEmail=email.toLowerCase();
        let exist=await userModel.findOne({email:normalizedEmail});
        if(!exist){
            return res.json({success:false,message:"User doesn't exist"});
        }
        const otp=Math.floor(Math.random()*(9999-1000+1)+1000);
        const newUser=new passwordResetModel({
            email:normalizedEmail,
            resetOTP:otp,
            resetOTPExpiry:new Date()
        })
       await newUser.save();
       const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}
       });
       await transporter.sendMail({
        to:email,
        subject:"CodeFolio Password Reset OTP",
        html:`<p>Your OTP is <b>${otp}</b>.It will expire in 10 minutes.`
       })
       return res.json({sucess:true,message:"OTP send to your email"});
    }
    catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
export default passwordResetController;
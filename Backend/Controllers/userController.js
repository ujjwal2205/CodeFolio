import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import verifyGoogleToken from "../Middlewares/googleAuth.js";
const createToken=(email)=>{
    return jwt.sign({email:email},process.env.JWT_SECRET,{ expiresIn: "7d" });
}
// Sign Up
const signUp=async(req,res)=>{
    const {userName,firstName,middleName,lastName,email,password,confirmPassword,leetCode,codeChef,codeForces}=req.body;
    try{
    const normalizedEmail=email.toLowerCase();
    const normalizedUserName=userName.toLowerCase().trim();
    const exists=await userModel.findOne({email:normalizedEmail});
    const exists2=await userModel.findOne({userName:normalizedUserName});
    if(exists){
        return res.json({success:false,message:'User already exists'});
    }
    if(exists2){
        return res.json({success:false,message:"UserName already taken."});
    }
    if(!validator.isEmail(normalizedEmail)){
        return res.json({success:false,message:'Please Enter a valid Email'});
    }
    if(password!=confirmPassword){
       return res.json({success:false,message:'Passwords do not match'});
    }
    if(password.length<8){
       return res.json({success:false,message:'Please Enter a Password of at least 8 characters'});
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=new userModel({
        userName:normalizedUserName,
        firstName:firstName,
        middleName:middleName,
        lastName:lastName,
        email:normalizedEmail,
        password:hashedPassword,
        authType:"local",
        leetCode:leetCode,
        codeChef:codeChef,
        codeForces:codeForces
    })
    await newUser.save();
    const token=createToken(normalizedEmail);
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    })
    return res.json({success:true,token,message:"Login Successful!"});
    }
    catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
// Log In
const logIn=async(req,res)=>{
  const {email,password}=req.body;
  try{
   const normalizedEmail=email.toLowerCase();
   const exists=await userModel.findOne({email:normalizedEmail});
   if(!exists){
    return res.json({success:false,message:"User doesn't exists"});
   }
   if(exists.authType=="google"){
    return res.json({success:false,message:"Please Login via Google Sign-In."});
   }
   const isMatch=await bcrypt.compare(password,exists.password);
   if(!isMatch){
    return res.json({success:false,message:"Invalid credentials"});
   }
   const token=createToken(normalizedEmail);
   res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    })
   return res.json({success:true,token,message:"Login Successful!"});
  }
  catch(error){
  console.log(error.message);
  return res.json({success:false,message:error.message});
  }
}
//LogOut
const logOut=async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        });
        return res.json({success:true,message:"Logged Out Successfully!"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
//googleLogin
const googleLogin=async(req,res)=>{
    try {
        const {idToken}=req.body;
        const googleUser=await verifyGoogleToken(idToken);
        const {email,given_name,family_name}=googleUser;
        const normalizedEmail=email.toLowerCase();
        let user=await userModel.findOne({email:normalizedEmail});
        if(user && user.authType!=="google"){
        return res.json({success:false,message:"This email is already registered via password login"});
        }
        if(!user){
            let normalizedUserName=given_name?.toLowerCase().trim()||normalizedEmail.split("@")[0];
            let count=1;
            while(await userModel.findOne({userName:normalizedUserName})){
                normalizedUserName=`${normalizedUserName}${count}`;
                count++;
            }
           user=new userModel({
            userName:normalizedUserName,
            email:normalizedEmail,
            firstName:given_name,
            lastName:family_name||"N/A",
            authType:"google"
           });
           await user.save();
        }
        const token=createToken(normalizedEmail);
        res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    })
    return res.json({success:true,message:"Login Successful!"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Invalid Token"});
        
    }
}
export {signUp,logIn,logOut,googleLogin};
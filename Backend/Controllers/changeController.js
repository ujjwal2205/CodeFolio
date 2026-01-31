import userModel from "../models/userModel.js";
const linkedInChange=async(req,res)=>{
 const {email,handle}=req.body;
 try {
    const normalizedEmail=email.toLowerCase();
    const user=await userModel.findOne({email:normalizedEmail});
    if(!user){
        return res.json({success:false,message:"user doesn't exist"});
    }
    user.linkedIn=handle;
    await user.save();
    return res.json({success:true,message:"LinkedIn handle changed successfully"});
 } catch (error) {
    console.log(error);
    return res.json({success:false,message:error.message});
 }
}
const twitterChange=async(req,res)=>{
    const{email,handle}=req.body;
    try {
    const normalizedEmail=email.toLowerCase();
    const user=await userModel.findOne({email:normalizedEmail});
    if(!user){
        return res.json({success:false,message:"user doesn't exist"});
    }
    user.twitter=handle;
    await user.save();
    return res.json({success:true,message:"X handle changed successfully"});
}
catch(error){
    console.log(error);
    return res.json({success:false,message:error.message});
}}
const leetcodeHandleChange=async(req,res)=>{
    const {email,handle}=req.body;
    try {
        const normalizedEmail=email.toLowerCase();
        let user=await userModel.findOne({email:normalizedEmail});
        if(!user){
            return res.json({success:false,message:"User doesn't exist"});
        }
        user.leetCode=handle;
        await user.save();
        return res.json({success:true,message:"Leetcode Username saved successfully."});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const codeForcesHandleChange=async(req,res)=>{
    const {email,handle}=req.body;
    try {
        const normalizedEmail=email.toLowerCase();
        let user=await userModel.findOne({email:normalizedEmail});
        if(!user){
            return res.json({success:false,message:"User doesn't exist"});
        }
        user.codeForces=handle;
        await user.save();
        return res.json({success:true,message:"CodeForces Username saved successfully"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const codeChefHandleChange=async(req,res)=>{
    const {email,handle}=req.body;
    try {
        const normalizedEmail=email.toLowerCase();
        let user=await userModel.findOne({email:normalizedEmail});
        if(!user){
            return res.json({success:false,message:"User doesn't exist"});
        }
        user.codeChef=handle;
        await user.save();
        return res.json({success:true,message:"CodeChef Username saved successfully"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const userNameChange=async(req,res)=>{
    const{email,newUserName}=req.body;
    try {
        const normalizedEmail=email.toLowerCase();
        const normalizedUserName=newUserName.toLowerCase().trim();
        if(!normalizedUserName){
            return res.json({success:false,message:"Enter Valid Username."});
        }
        let user=await userModel.findOne({email:normalizedEmail});
        let alreadyExists=await userModel.findOne({userName:normalizedUserName});
        if(!user){
            return res.json({success:false,message:"User doesn't exist"});
        }
        if(user.userName===normalizedUserName){
            return res.json({success:false,message:"Same username already set."})
        }
        if(alreadyExists){
            return res.json({success:false,message:"Username already taken!"});
        }
        user.userName=normalizedUserName;
        await user.save();
        return res.json({success:true,message:"UserName changes successfully"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
export {leetcodeHandleChange,codeForcesHandleChange,codeChefHandleChange,userNameChange,linkedInChange,twitterChange};

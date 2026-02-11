import conversationsModel from "../models/conversationModel.js";
import messagesModel from "../models/messagesModel.js";
const getConversations=async(req,res)=>{
    const userId=req.user.userId;
    try {
        const conversations=await conversationsModel.find({members:userId}).populate("members","userName").sort({updatedAt:-1});
        return res.json({success:true,data:conversations});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const getMessages=async(req,res)=>{
     const {conversationId}=req.body;
    try {
        const messages=await messagesModel.find({conversationId:conversationId}).sort({createdAt: 1});
        return res.json({success:true,data:messages});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const addMessage=async(req,res)=>{
    const {conversationId,text}=req.body;
    const senderId=req.user.userId;
    try {
        const newMessage=await messagesModel.create({conversationId,senderId,text});
        await conversationsModel.findByIdAndUpdate(conversationId,{lastMessage:text});
        return res.json({success:true,newMessage});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
        
    }
}
export {getConversations,getMessages,addMessage};
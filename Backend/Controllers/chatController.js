import conversationsModel from "../models/conversationModel.js";
import messagesModel from "../models/messagesModel.js";
const getConversations=async(req,res)=>{
    const userId=req.user.userId;
    try {
        const conversations=await conversationsModel.find({members:userId}).populate("members","userName").sort({updatedAt:-1}).lean();
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
    const {conversationId,receiverId,text}=req.body;
    const senderId=req.user.userId;
    try {
        let conversation;
        if(conversationId){
            conversation=await conversationsModel.findById(conversationId);
        }
        if(!conversation){
            conversation= await conversationsModel.findOne({members:{$all:[senderId,receiverId]}});
        }
        if(!conversation){
            conversation=await conversationsModel.create({
                members:[senderId,receiverId],
                unreadCount:{
                    [senderId]:0,
                    [receiverId]:0
                },
                lastMessage:""
            });
        }
        const newMessage=await messagesModel.create({conversationId:conversation._id,senderId,text});
        await conversationsModel.findByIdAndUpdate(conversation._id,{lastMessage:text,$inc:{[`unreadCount.${receiverId}`]:1}});
        return res.json({success:true,newMessage,conversationId:conversation._id});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
        
    }
}
export {getConversations,getMessages,addMessage};
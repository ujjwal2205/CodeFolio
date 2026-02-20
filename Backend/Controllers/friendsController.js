import userModel from "../models/userModel.js";
import conversationsModel from "../models/conversationModel.js";
import messagesModel from "../models/messagesModel.js";
const sendFriendRequest=async(req,res)=>{
    const {receiverUserName}=req.body;
    const userId=req.user.userId;
    const io=req.app.get("io");
    const onlineUsers=req.app.get("onlineUsers");
    try {
        const normalizedUserName=receiverUserName.toLowerCase().trim();
        let sender=await userModel.findById(userId);
        if(!sender){
            return res.json({success:false,message:"Sender doesn't exist."});
        }
        let receiver=await userModel.findOne({userName:normalizedUserName});
        if(!receiver){
            return res.json({success:false,message:"User not found"});
        }
        if(receiver._id.equals(sender._id)){
            return res.json({success:false,message:"Cannot add yourself"});
        }
        if(sender.friends.some(id=>id.equals(receiver._id))){
            return res.json({success:false,message:"Already Friends"});
        }
        if(receiver.friendRequests.some(id=>id.equals(sender._id))){
            return res.json({success:false,message:"Request already sent"});
        }
        receiver.friendRequests.push(sender._id);
        await receiver.save();
        const receiverSocketId=onlineUsers.get(receiver._id.toString());
        if(receiverSocketId){
            io.to(receiverSocketId).emit("friendRequestReceived",{
                userName:sender.userName,
                userId:sender._id,
                score:sender.score,
                leetCode:sender.leetCode,
                codeChef:sender.codeChef,
                codeForces:sender.codeForces
            })
        }
        return res.json({success:true,message:"Friend Request Sent"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const acceptFriendRequest=async(req,res)=>{
    const {senderUserName}=req.body;
    const userId=req.user.userId;
    const io=req.app.get("io");
    const onlineUsers=req.app.get("onlineUsers");
    try {
        const normalizedSenderUserName=senderUserName.toLowerCase().trim();
        if(!normalizedSenderUserName){
            return res.json({success:false,message:"User not found"});
        }
        const sender=await userModel.findOne({userName:normalizedSenderUserName});
        if(!sender){
            return res.json({success:false,message:"Sender not found."});
        }
        const receiver=await userModel.findById(userId);
        if(!receiver){
            return res.json({success:false,message:"Receiver not found."});
        }
        receiver.friendRequests=receiver.friendRequests.filter(
            id=>!id.equals(sender._id)
        )
        receiver.friends.push(sender._id);
        sender.friends.push(receiver._id);
        await receiver.save();
        await sender.save();
        const senderSocketId=onlineUsers.get(sender._id.toString());
        if(senderSocketId){
            io.to(senderSocketId).emit("friendRequestAccepted",{
                _id:receiver._id,
                userName:receiver.userName,
                score:receiver.score
            })
        }
        return res.json({success:true,message:"Friend request accepted."});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const rejectFriendRequest=async(req,res)=>{
    const {senderUserName}=req.body;
    const userId=req.user.userId;
    try {
        const normalizedSenderUserName=senderUserName.toLowerCase().trim();
        if(!normalizedSenderUserName){
            return res.json({success:false,message:"User not found"});
        }
        const sender=await userModel.findOne({userName:normalizedSenderUserName});
        if(!sender){
            return res.json({success:false,message:"Sender not found."});
        }
        const receiver=await userModel.findById(userId);
        if(!receiver){
            return res.json({success:false,message:"Receiver not found."});
        }
        receiver.friendRequests=receiver.friendRequests.filter(
            id=>!id.equals(sender._id)
        )
        await receiver.save();
        return res.json({success:true,message:"Friend Request Rejected."});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const removeFriend=async(req,res)=>{
    const {friendUserName}=req.body;
    const userId=req.user.userId;
    const io=req.app.get("io");
    const onlineUsers=req.app.get("onlineUsers");
    try {
        const normalizedFriendUserName=friendUserName.toLowerCase().trim();
        if(!normalizedFriendUserName){
            return res.json({success:false,message:"Invalid UserName"});
        }
        const user=await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"Your db entry not found!"});
        }
        const friend=await userModel.findOne({userName:normalizedFriendUserName});
        if(!friend){
            return res.json({success:false,message:"User not found!"});
        }
        const conversation=await conversationsModel.findOne({members:{$all:[user._id,friend._id]}});
        if(conversation){
        await conversationsModel.deleteOne({_id:conversation._id});
        await messagesModel.deleteMany({conversationId:conversation._id});
        }
        user.friends=user.friends.filter(
            id=>!id.equals(friend._id)
        )
        friend.friends=friend.friends.filter(
            id=>!id.equals(user._id)
        )
        await user.save();
        await friend.save();
        const conversationId=conversation?conversation._id:null;
        const userSocketId=onlineUsers.get(user._id.toString());
        const friendSocketId=onlineUsers.get(friend._id.toString());
        if(friendSocketId){
            io.to(friendSocketId).emit("friendRemoved",{_id:user._id,userName:user.userName,conversationId});
        }
        if(userSocketId){
            io.to(userSocketId).emit("friendRemoved",{_id:friend._id,userName:friend.userName,conversationId});
        }
        return res.json({success:true,message:"Friend Removed Successfully."});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const getFriends=async(req,res)=>{
    const userId=req.user.userId;
    try {
        let user=await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"User not found."});
        }
        user=await user.populate("friends","userName leetCode codeChef codeForces score");
        return res.json({success:true,friends:user.friends});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const getFriendRequests=async(req,res)=>{
    const {userName}=req.params;
    try {
        let user=await userModel.findOne({userName});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        user=await user.populate("friendRequests","userName leetCode codeChef codeForces score");
        return res.json({success:true,requests:user.friendRequests});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
export {sendFriendRequest,acceptFriendRequest,rejectFriendRequest,getFriends,removeFriend,getFriendRequests};
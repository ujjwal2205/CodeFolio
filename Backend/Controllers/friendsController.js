import userModel from "../models/userModel.js";
const sendFriendRequest=async(req,res)=>{
    const {receiverUserName}=req.body;
    const userName=req.user.userName;
    try {
        const normalizedUserName=receiverUserName.toLowerCase().trim();
        let sender=await userModel.findOne({userName});
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
        return res.json({success:true,message:"Friend Request Sent"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const acceptFriendRequest=async(req,res)=>{
    const {senderUserName}=req.body;
    const userName=req.user.userName;
    try {
        const normalizedSenderUserName=senderUserName.toLowerCase().trim();
        if(!normalizedSenderUserName){
            return res.json({success:false,message:"User not found"});
        }
        const sender=await userModel.findOne({userName:normalizedSenderUserName});
        if(!sender){
            return res.json({success:false,message:"Sender not found."});
        }
        const receiver=await userModel.findOne({userName});
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
        return res.json({success:true,message:"Friend request accepted."});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const rejectFriendRequest=async(req,res)=>{
    const {senderUserName}=req.body;
    const userName=req.user.userName;
    try {
        const normalizedSenderUserName=senderUserName.toLowerCase().trim();
        if(!normalizedSenderUserName){
            return res.json({success:false,message:"User not found"});
        }
        const sender=await userModel.findOne({userName:normalizedSenderUserName});
        if(!sender){
            return res.json({success:false,message:"Sender not found."});
        }
        const receiver=await userModel.findOne({userName});
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
    const userName=req.user.userName;
    try {
        const normalizedFriendUserName=friendUserName.toLowerCase().trim();
        if(!normalizedFriendUserName){
            return res.json({success:false,message:"Invalid UserName"});
        }
        const user=await userModel.findOne({userName});
        if(!user){
            return res.json({success:false,message:"Your db entry not found!"});
        }
        const friend=await userModel.findOne({userName:normalizedFriendUserName});
        if(!friend){
            return res.json({success:false,message:"User not found!"});
        }
        user.friends=user.friends.filter(
            id=>!id.equals(friend._id)
        )
        friend.friends=friend.friends.filter(
            id=>!id.equals(user._id)
        )
        await user.save();
        await friend.save();
        return res.json({success:true,message:"Friend Removed Successfully."});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const getFriends=async(req,res)=>{
    const userName=req.user.userName;
    try {
        let user=await userModel.findOne({userName});
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
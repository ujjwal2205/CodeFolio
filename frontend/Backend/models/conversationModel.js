import mongoose from "mongoose";
const conversations=new mongoose.Schema({
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    unreadCount:{
        type:Map,
        of:Number,
        default:{}
    },
    lastMessage:{type:String,default:""}
    },{timestamps:true});
const conversationsModel=mongoose.models.conversations || mongoose.model("conversations",conversations);
export default conversationsModel;
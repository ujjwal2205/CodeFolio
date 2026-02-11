import mongoose from "mongoose";
const messages=new mongoose.Schema({
conversationId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"conversations",
    required:true
},
senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
},
text:{
    type:String,
    required:true,
},
},{timestamps:true});
const messagesModel=mongoose.models.messages || mongoose.model("messages",messages);
export default messagesModel;
import express from "express"
import cors from "cors"
import {connectDB} from './config/db.js';
import mongoose from "mongoose";
import userRouter from "./Routes/userRoute.js";
import siteRouter from "./Routes/siteRoute.js";
import passwordReset from "./Routes/passwordResetRoute.js";
import Friends from "./Routes/friendsRoute.js";
import LeaderBoard from "./Routes/leaderBoardRoute.js";
import chat from "./Routes/chatRoute.js";
import changeRouter from "./Routes/ChangeRoute.js";
import cookieParser from "cookie-parser";
import messagesModel from "./models/messagesModel.js";
import http from "http";
import {Server} from "socket.io";
import 'dotenv/config'
const app=express();
const port=4000;

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
connectDB();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
});
const onlineUsers=new Map();
const openChats=new Map();
io.on("connection",(socket)=>{
    console.log("New user connected:",socket.id);
    socket.on("register",(userId)=>{
        if(!userId){
            return;
        }
        onlineUsers.set(userId,socket.id);
        io.emit("onlineUsers",Array.from(onlineUsers.keys()));
        console.log("Online Users:",onlineUsers);
    })
    socket.on("openChat",async({userId,conversationId,receiverId})=>{
        const receiverSocket=onlineUsers.get(receiverId);
        if(!openChats.has(userId)){
        openChats.set(userId,new Set());
        }
        openChats.get(userId).add(conversationId);
        const receiverObjectId=new mongoose.Types.ObjectId(receiverId);
        await messagesModel.updateMany({conversationId,senderId:receiverObjectId,seen:false},{$set:{seen:true}});
        if(receiverSocket){
        io.to(receiverSocket).emit("messagesSeen",{conversationId,userId});
        }
    });
    socket.on("closeChat",({userId,conversationId})=>{
        if(openChats.has(userId)){
            openChats.get(userId).delete(conversationId);
            if(openChats.get(userId).size==0){
                openChats.delete(userId);
            }
        }
    })
    socket.on("unregister",()=>{
        for(let [key,value] of onlineUsers){
            if(value==socket.id){
                onlineUsers.delete(key);
                break;
            }
        }
        io.emit("onlineUsers",Array.from(onlineUsers.keys()));
        console.log("User disconnected. Online Users:",onlineUsers);
    })
    
    socket.on("disconnect",()=>{
     for(let [key,value] of onlineUsers.entries()){
        if(value==socket.id){
            onlineUsers.delete(key);
            break;
        }
     }
     io.emit("onlineUsers",Array.from(onlineUsers.keys()));
     console.log("User disconnected. Online Users:",onlineUsers);
    })
})
app.get("/",(req,res)=>{
    res.send("API Working");
})
app.use("/api/user",userRouter);
app.use("/api/site",siteRouter);
app.use("/api/forgot-password",passwordReset);
app.use("/api/friends",Friends);
app.use("/api/Leaderboard",LeaderBoard);
app.use("/api/change",changeRouter);
app.use("/api/chat",chat);
app.set("io",io);
app.set("onlineUsers",onlineUsers);
app.set("openChats",openChats);
server.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})
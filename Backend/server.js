import express from "express"
import cors from "cors"
import {connectDB} from './config/db.js';
import userRouter from "./Routes/userRoute.js";
import siteRouter from "./Routes/siteRoute.js";
import passwordReset from "./Routes/passwordResetRoute.js";
import Friends from "./Routes/friendsRoute.js";
import LeaderBoard from "./Routes/leaderBoardRoute.js";
import changeRouter from "./Routes/ChangeRoute.js";
import cookieParser from "cookie-parser";
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
app.set("io",io);
app.set("onlineUsers",onlineUsers);
server.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})
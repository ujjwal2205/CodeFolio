import express from "express"
import cors from "cors"
import {connectDB} from './config/db.js';
import userRouter from "./Routes/userRoute.js";
import siteRouter from "./Routes/siteRoute.js";
import passwordReset from "./Routes/passwordResetRoute.js";
import Insert from "./Routes/InsertRoute.js";
import Friends from "./Routes/friendsRoute.js";
import cookieParser from "cookie-parser";
import 'dotenv/config'
const app=express();
const port=4000;

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5123",
    credentials:true
}));
app.use(cookieParser());
connectDB();
app.get("/",(req,res)=>{
    res.send("API Working");
})
app.use("/api/user",userRouter);
app.use("/api/site",siteRouter);
app.use("/api/forgot-password",passwordReset);
app.use("/api/info",Insert);
app.use("/api/friends",Friends);
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})
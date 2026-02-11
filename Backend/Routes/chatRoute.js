import {getConversations,getMessages,addMessage} from '../Controllers/chatController.js';
import express from "express";
import authMiddleware from '../Middlewares/authMiddleware.js';
const chat=express.Router();
chat.post("/getConversations",getConversations);
chat.post("/getMessages",getMessages);
chat.post("/addMessage",addMessage);
export default chat;
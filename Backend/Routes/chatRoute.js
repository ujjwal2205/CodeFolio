import {getConversations,getMessages,addMessage} from '../Controllers/chatController.js';
import express from "express";
import authMiddleware from '../Middlewares/authMiddleware.js';
const chat=express.Router();
chat.post("/getConversations",authMiddleware,getConversations);
chat.post("/getMessages",authMiddleware,getMessages);
chat.post("/addMessage",authMiddleware,addMessage);
export default chat;
import {getConversations,getMessages,addMessage,getOrCreateConversations} from '../Controllers/chatController.js';
import express from "express";
import authMiddleware from '../Middlewares/authMiddleware.js';
const chat=express.Router();
chat.post("/getConversations",authMiddleware,getConversations);
chat.post("/getMessages",authMiddleware,getMessages);
chat.post("/addMessage",authMiddleware,addMessage);
chat.post("/getOrCreateConversations",authMiddleware,getOrCreateConversations);
export default chat;
import { acceptFriendRequest,sendFriendRequest,rejectFriendRequest,getFriends,removeFriend,getFriendRequests} from "../Controllers/friendsController.js";
import express from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";
const Friends=express.Router();
Friends.post("/sendFriendRequest",authMiddleware,sendFriendRequest);
Friends.post("/acceptFriendRequest",authMiddleware,acceptFriendRequest);
Friends.post("/rejectFriendRequest",authMiddleware,rejectFriendRequest);
Friends.post("/getFriends",authMiddleware,getFriends);
Friends.post("/removeFriend",authMiddleware,removeFriend);
Friends.post("/getFriendRequests/:userName",authMiddleware,getFriendRequests)
export default Friends;
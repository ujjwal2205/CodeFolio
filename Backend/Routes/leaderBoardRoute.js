import express from "express";
import { fetchLeaderBoard,fetchLeetCodeLeaderBoard,fetchCodeChefLeaderBoard,fetchCodeForcesLeaderBoard } from "../Controllers/leaderBoardController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
const LeaderBoard=express.Router();
LeaderBoard.post("/fetchLeaderBoard/:userName",authMiddleware,fetchLeaderBoard);
LeaderBoard.post("/fetchLeetcodeLeaderBoard",authMiddleware,fetchLeetCodeLeaderBoard);
LeaderBoard.post("/fetchCodeChefLeaderBoard",authMiddleware,fetchCodeChefLeaderBoard);
LeaderBoard.post("/fetchCodeForcesLeaderBoard",authMiddleware,fetchCodeForcesLeaderBoard);
export default LeaderBoard;
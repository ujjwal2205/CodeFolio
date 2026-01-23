import express from "express";
import { fetchLeaderBoard,fetchLeetCodeLeaderBoard,fetchCodeChefLeaderBoard,fetchCodeForcesLeaderBoard } from "../Controllers/leaderBoardController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
const LeaderBoard=express.Router();
LeaderBoard.post("/fetchLeaderBoard",fetchLeaderBoard,authMiddleware);
LeaderBoard.post("/fetchLeetcodeLeaderBoard",fetchLeetCodeLeaderBoard,authMiddleware);
LeaderBoard.post("/fetchCodeChefLeaderBoard",fetchCodeChefLeaderBoard,authMiddleware);
LeaderBoard.post("/fetchCodeForcesLeaderBoard",fetchCodeForcesLeaderBoard,authMiddleware);
export default LeaderBoard;
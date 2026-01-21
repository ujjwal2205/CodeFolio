import express from "express";
import { fetchLeaderBoard } from "../Controllers/leaderBoardController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
const LeaderBoard=express.Router();
LeaderBoard.post("/fetchLeaderBoard",fetchLeaderBoard);
export default LeaderBoard;
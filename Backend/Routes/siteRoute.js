import express from "express";
import {codeForces,LeetCode,codeChef,Score} from "../Controllers/platformsController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
const siteRouter=express.Router();
siteRouter.post("/codeForces",authMiddleware,codeForces);
siteRouter.post("/leetcode",authMiddleware,LeetCode);
siteRouter.post("/codeChef",codeChef);
siteRouter.post("/Score",Score);
export default siteRouter;
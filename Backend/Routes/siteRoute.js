import express from "express";
import {codeForces,LeetCode,codeChef} from "../Controllers/platformsController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
const siteRouter=express.Router();
siteRouter.post("/codeForces/:userName",authMiddleware,codeForces);
siteRouter.post("/leetcode/:userName",authMiddleware,LeetCode);
siteRouter.post("/codeChef/:userName",authMiddleware,codeChef);
export default siteRouter;
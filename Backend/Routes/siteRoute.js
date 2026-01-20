import express from "express";
import {codeForces,LeetCode,codeChef} from "../Controllers/platformsController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
const siteRouter=express.Router();
siteRouter.post("/codeForces",authMiddleware,codeForces);
siteRouter.post("/leetcode",authMiddleware,LeetCode);
siteRouter.post("/codeChef",codeChef);
export default siteRouter;
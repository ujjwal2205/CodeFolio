import { leetcodeHandleChange,codeChefHandleChange,codeForcesHandleChange,userNameChange } from "../Controllers/InsertController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import express from "express";
const Insert=express.Router();
Insert.post("/leetCodeHandle",authMiddleware,leetcodeHandleChange);
Insert.post("/codeChefHandle",authMiddleware,codeChefHandleChange);
Insert.post("/codeForcesHandle",authMiddleware,codeForcesHandleChange);
Insert.post("/userName",authMiddleware,userNameChange);
export default Insert;
import express from "express";
import {signUp,logIn,logOut,googleLogin} from "../Controllers/userController.js";
const userRouter=express.Router();
userRouter.post("/signUp",signUp);
userRouter.post("/logIn",logIn);
userRouter.post("/logOut",logOut);
userRouter.post("/googleLogin",googleLogin);
export default userRouter;
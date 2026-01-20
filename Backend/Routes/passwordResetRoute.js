import passwordResetController from "../Controllers/passwordResetController.js";
import OTPVerificationController from "../Controllers/OTPVerificationController.js";
import express from "express";
const passwordReset=express.Router();
passwordReset.post("/otp",passwordResetController);
passwordReset.post("/verification",OTPVerificationController);
export default passwordReset;
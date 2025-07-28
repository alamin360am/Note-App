import express from "express";
import { signupWithEmail, verifyOtpAndRegister } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/signup", signupWithEmail);
userRouter.post("/verify-otp", verifyOtpAndRegister);

export default userRouter;

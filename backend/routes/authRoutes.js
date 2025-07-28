import express from "express";
import { loginWithEmail, signupWithEmail, verifyOtpAndRegister } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/signup", signupWithEmail);
userRouter.post("/verify-otp", verifyOtpAndRegister);
userRouter.post("/login", loginWithEmail);

export default userRouter;

import express from "express";
import { getUserProfile, loginWithEmail, logOut, signupWithEmail, verifyLoginOtp, verifyOtpAndRegister } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signupWithEmail);
userRouter.post("/verify-otp", verifyOtpAndRegister);
userRouter.post("/login", loginWithEmail);
userRouter.post("/verify-login", verifyLoginOtp);

userRouter.get("/profile", protect, getUserProfile);
userRouter.post("/logout", logOut);

export default userRouter;

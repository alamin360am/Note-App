import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import {
  getUserProfile,
  loginWithEmail,
  logOut,
  signupWithEmail,
  verifyLoginOtp,
  verifyOtpAndRegister
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { generateTokenAndSetCookie } from "../utils/jwt.js";

dotenv.config();

const userRouter = express.Router();

// Email based routes
userRouter.post("/signup", signupWithEmail);
userRouter.post("/verify-otp", verifyOtpAndRegister);
userRouter.post("/login", loginWithEmail);
userRouter.post("/verify-login", verifyLoginOtp);
userRouter.get("/profile", protect, getUserProfile);
userRouter.post("/logout", logOut);

// Google OAuth routes
userRouter.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

userRouter.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: false,
  }),

  async function (req, res) {
    generateTokenAndSetCookie(res, req.user._id);
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  },
);

export default userRouter;

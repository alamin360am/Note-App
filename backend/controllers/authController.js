import User from "../models/user.model.js";
import { getVerificationEmailHtml } from "../utils/emailTemplate.js";
import { sendOtpToEmail } from "../utils/sendEmail.js";
import { generateTokenAndSetCookie } from "../utils/jwt.js";

export const signupWithEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existingUser = await User.findOne({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: "Email already exists" });
      }
      existingUser.otp = otp;
      existingUser.otpExpire = otpExpire;

      await existingUser.save();

    } else {
      await User.create({ email, otp, otpExpire });
    }

    await sendOtpToEmail(email, getVerificationEmailHtml(otp));

    res.status(200).json({ message: "OTP sent to email" });
    
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};

export const verifyOtpAndRegister = async (req, res) => {
  const { email, otp, name, dob } = req.body;

  if (!email || !otp || !name)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.name = name;
    user.dob = dob;
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({ message: "Signup successful", user });
    
  } catch (error) {
    res.status(500).json({ message: "OTP verification failed", error });
  }
};

export const loginWithEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpire = otpExpire;
    await user.save();

    await sendOtpToEmail(email, getVerificationEmailHtml(otp));

    res.status(200).json({ message: "OTP sent to your email" });

  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpire = null;
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({ message: "Login successful", user });

  } catch (err) {
    res.status(500).json({ message: "OTP verification failed" });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-otp");
      if(!user) {
        return res.status(404).json({message: "User not found"});
      }

      res.json(user);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
}

export const logOut = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"})
}



import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    dob: { type: Date },
    email: {
      type: String,
      unique: true,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },

    otpExpire: {
      type: Date,
    },

    isGoogleUser: {
      type: Boolean,
      default: false,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
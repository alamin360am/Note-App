import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type: String},
  dob: {type: Date},
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
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
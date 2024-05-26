import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female", "Other"],
    },
    avatar: {
      type: String, // cloudnary URL
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

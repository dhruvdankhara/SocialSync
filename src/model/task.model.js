import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const Task = mongoose.model("Task", taskSchema);

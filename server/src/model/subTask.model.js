import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema({
  mainTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  title: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
  },
});

export const SubTask = mongoose.model("SubTask", subTaskSchema);

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'done'],
    required: true,
  },
  groupId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: String,
    default: '5 May',
  },
  files: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
  assignedUsers:{
    type: Array,
    default: [],
  },
  position: {
    type: Number,
    default: 0,
  }
});

const Group = mongoose.model("Task", taskSchema);

export default Group;

import { task } from "../_types/task.type";
import { taskStatus } from "./taskStatus";

export const initTask = {
  _id: "",
  name: "",
  description: "",
  status: taskStatus.todo,
  groupId: "",
  user: "",
  createdAt: "",
  deadline: "",
  progress: 0,
  files: 0,
  assignedUsers: [],
} as task;

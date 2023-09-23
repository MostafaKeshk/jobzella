import { assignedUser } from "./assignedUser.type";
import { taskStatus } from "./taskStatus.type";

export type task = {
  _id: string;
  name: string;
  description: string;
  status: taskStatus;
  groupId: string;
  user: string;
  createdAt: string;
  deadline: string;
  progress: number;
  files: number;
  assignedUsers: assignedUser[];
};

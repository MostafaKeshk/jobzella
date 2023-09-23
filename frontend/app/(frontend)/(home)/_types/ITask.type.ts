import { task } from "./task.type";

export interface ITask {
  todo: task[];
  inProgress: task[];
  done: task[];
}

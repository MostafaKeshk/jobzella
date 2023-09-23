import { ITask } from "../_types/ITask.type";
import { task } from "../_types/task.type";
import { initTask } from "./inits";

export const findTask = (tasks: ITask, id: string | number): task => {
  const taskId: any = Object.entries(tasks).find(([key, value]: any) =>
    value.some((task: any) => task._id === id)
  );

  if (taskId) {
    return taskId[1].find((i: any) => i._id === id);
  }
  return initTask;
};

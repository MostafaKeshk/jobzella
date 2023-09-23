import { ITask } from "../_types/ITask.type";
import { task } from "../_types/task.type";

export const filterTasksByStatus = (tasks: task[]) => {
  const filteredTasks: ITask = {
    todo: [],
    inProgress: [],
    done: [],
  };

  tasks.forEach((task) => {
    filteredTasks[task.status].push(task);
  });

  return filteredTasks;
};

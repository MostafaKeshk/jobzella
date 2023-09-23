export const findTaskList = (tasks: any, id: string): string | undefined => {
  const taskId = Object.keys(tasks).find((key: any) =>
    tasks[key].some((item: any) => item._id === id)
  );

  if (taskId) return taskId;
  return Object.keys(tasks).find((key: any) => id === key);
};

type user = {
  _id: string;
  name: string;
  image: string;
};

export type item = {
  _id: string;
  name: string;
  description: string;
  status: "todo" | "inProgress" | "done";
  groupId: string;
  user: string;
  createdAt: string;
  deadline: string;
  progress: number;
  files: number;
  assignedUsers: user[];
};

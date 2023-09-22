import { url } from "@/config/url";
import { authHeader } from "@/utils/authHeader";
import axios from "axios";

class TaskApi {
  static async create(token: string, body: any) {
    const res = await axios.post(`${url}/api/task`, body, {
      headers: authHeader(token),
    });
    return res.data;
  }

  static async get(groupId: string, token: string) {
    const res = await fetch(`${url}/api/task/${groupId}`, {
      headers: authHeader(token),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    return data;
  }

  static async sort(
    token: string,
    body: {
      activeId: string;
      overId: string;
      activeNewPanel: "todo" | "inProgress" | "done";
    }
  ) {
    const res = await axios.put(`${url}/api/task/sort-tasks`, body, {
      headers: authHeader(token),
    });
    return res.data;
  }
}

export default TaskApi;

import { url } from "@/config/url";
import { authHeader } from "@/utils/authHeader";
import axios from "axios";

class GroupApi {
  static async create(token: string, body: { name: string }) {
    const res = await axios.post(`${url}/api/group`, body, {
      headers: authHeader(token),
    });
    return res.data;
  }

  static async get(token: string) {
    const res = await fetch(`${url}/api/group`, {
      headers: authHeader(token),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    return data.rows;
  }
}

export default GroupApi;

import { url } from "@/config/url";
import axios from "axios";

class LoginApi {
  static async login(body: any) {
    const response = await axios.post(`${url}/api/auth/login`, body);

    return response.data;
  }
}

export default LoginApi;

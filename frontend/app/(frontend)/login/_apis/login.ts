import { url } from "@/config/url";

class LoginApi {
  static async login(body: any) {
    const res = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return { ok: res.ok, data };
  }
}

export default LoginApi;

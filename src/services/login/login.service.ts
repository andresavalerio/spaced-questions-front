import axios from "axios";

export class LoginService {
  url = "fake_url";

  async verifyUser(username: string) {
    try {
      const result = await axios.post(`${this.url}/login`, { username });

      return { success: true, userData: result.data, msg: "User exists" };
    } catch (error) {
      return { success: false, msg: "User don't exists" };
    }
  }
}

import axios from "axios";

type UserData = {
  username: string;
};

export interface ILoginServiceProvider {
  postVerifyUser(username: string): Promise<UserData>;
}

export class LoginServiceProvider implements ILoginServiceProvider {
  url = "fake_url";

  async postVerifyUser(username: string): Promise<UserData> {
    const result = await axios.post(`${this.url}/login`, { username });

    return result.data as UserData;
  }
}

export interface ILoginService {
  verifyUser(username: string): Promise<{
    success: boolean;
    userData?: UserData;
    msg: string;
  }>;
}

export class LoginService implements ILoginService {
  private provider: ILoginServiceProvider;

  constructor(provider: ILoginServiceProvider) {
    this.provider = provider;
  }

  async verifyUser(username: string) {
    const result = await this.provider.postVerifyUser(username);

    try {
      return { success: true, userData: result, msg: "User exists" };
    } catch (error) {
      return { success: false, msg: "User don't exists" };
    }
  }
}

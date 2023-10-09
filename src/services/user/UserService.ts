import {
  CreateUserDTO,
  IUserService,
  IUserClient,
  User,
} from "../../types/User";

export class UserService implements IUserService {
  constructor(private client: IUserClient, private tokenKey: string) {}

  public async createUser(data: CreateUserDTO): Promise<boolean> {
    try {
      await this.createUser(data);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async loginUser(
    login: string,
    password: string
  ): Promise<User | null> {
    try {
      const userLoginResponseData = await this.client.requestUserLogin(
        login,
        password
      );

      const { user, token } = userLoginResponseData;

      localStorage.setItem(this.tokenKey, token);

      return user;
    } catch (error) {
      return null;
    }
  }
}

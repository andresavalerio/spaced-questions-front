import {
  CreateUserDTO,
  IUserClient,
  LoginUserResponseDTO,
} from "../../types/User";
import { httpClient } from "../HttpClient";

export class UserClient implements IUserClient {
  requestUserCreation(data: CreateUserDTO): Promise<boolean> {
    return httpClient.post("/api/user", data);
  }

  requestUserLogin(
    login: string,
    password: string
  ): Promise<LoginUserResponseDTO> {
    return httpClient.post("/api/user/login", { login, password });
  }
}

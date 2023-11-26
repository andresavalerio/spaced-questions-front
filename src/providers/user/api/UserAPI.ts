import { fetchAPI } from "helpers/fetch";
import {
  CreateUserDTO,
  GetUserResponseDTO,
  LoginUserDTO,
  UserLoginAPIResponse,
} from "../types";
import {
  UserAlreadyExistsError,
  UserDontExistError,
  UserNotAuthorizedError,
  UserRequestError,
  UserTokenInvalidError,
} from "../errors";

export const requestUserLogin = async (login: string, password: string) => {
  const body: LoginUserDTO = { login, password };

  const requestBody: RequestInit = {
    method: "POST",
    body: JSON.stringify(body),
  };

  const response = await fetchAPI(`/user/login`, requestBody);

  if (response.status === 401) throw new UserNotAuthorizedError();

  if (response.status === 409) throw new UserDontExistError();

  if (response.status !== 200) throw new UserRequestError();

  return response.json() as unknown as UserLoginAPIResponse;
};

export const requestCreateUser = async (newUser: CreateUserDTO) => {
  const requestBody: RequestInit = {
    method: "POST",
    body: JSON.stringify(newUser),
  };

  const response = await fetchAPI("/user", requestBody);

  const notCreated = response.status !== 201;

  if (response.status === 409) throw new UserAlreadyExistsError();

  if (notCreated) throw Error();
};

export const requestGetUser = async () => {
  const requestBody: RequestInit = {
    method: "GET",
  };
  const response = await fetchAPI("/user", requestBody);

  if (response.status !== 200) throw new UserTokenInvalidError();

  return response.json() as Promise<GetUserResponseDTO>;
};

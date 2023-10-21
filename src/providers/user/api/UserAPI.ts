import { getResponseError, httpClient } from "httpClient";
import { CreateUserDTO, UserLoginAPIResponse } from "../types";
import { UserAlreadyExistsError, UserNotAuthorizedError } from "../errors";

export const requestUserLogin = async (login: string, password: string) => {
  try {
    const body = { login, password };

    const response = await httpClient.post("/api/user/login", body);

    return response.data as UserLoginAPIResponse;
  } catch (error) {
    const response = getResponseError(error);

    if (response.status === 401) throw new UserNotAuthorizedError();
  }
};

export const requestCreateUser = async (newUser: CreateUserDTO) => {
  try {
    const response = await httpClient.post("/api/user", newUser);

    const notCreated = response.status !== 201;

    if (notCreated) throw Error();
  } catch (error) {
    const response = getResponseError(error);

    if (response.status === 409) throw new UserAlreadyExistsError();
  }
};

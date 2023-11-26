import React from "react";

export type User = {
  username: string;
  email: string;
  fullName: string;
  active: boolean;
  userRole: UserRole;
  createdAt: Date;
};

export type UserState = {
  data?: User;
  loading: boolean;
};

export enum UserReducerTypes {
  LOGIN = "LOGIN",
  CREATE = "CREATE",
  LOGOUT = "LOGOUT",
  ERROR = "ERROR",
  LOADING = "LOADING",
}

type UserLoginReducer = {
  type: UserReducerTypes.LOGIN;
  payload: User;
};

type UserCreateReducer = {
  type: UserReducerTypes.CREATE;
  payload?: undefined;
};

type UserLogoutReducer = {
  type: UserReducerTypes.LOGOUT;
  payload?: undefined;
};

type UserErrorReducer = {
  type: UserReducerTypes.ERROR;
  payload?: undefined;
};

type UserLoadingReducer = {
  type: UserReducerTypes.LOADING;
  payload?: undefined;
};

export type UserReducers =
  | UserLoginReducer
  | UserCreateReducer
  | UserLogoutReducer
  | UserErrorReducer
  | UserLoadingReducer;

export type UserDispatch = React.Dispatch<UserReducers>;

export type UserRole = "Free" | "Premium";

export type UserLoginAPIResponse = {
  user: User;
  token: string;
};

export type CreateUserDTO = {
  fullName: string;
  username: string;
  password: string;
  email: string;
};

export type LoginUserDTO = {
  login: string;
  password: string;
};

export type GetUserResponseDTO = User;

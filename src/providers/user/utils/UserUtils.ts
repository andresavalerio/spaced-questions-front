import { UserState } from "../types";

export const isUserLogged = (state: UserState) => {
  const hasData = !!state.data;
  const isNotLoading = !state.loading;

  return hasData && isNotLoading;
};

export const removeLocalToken = () => {
  if (localStorage.getItem("token")) localStorage.removeItem("token");
};

export const hasToken = () => !!localStorage.getItem("token");

export const setToken = (token: string) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

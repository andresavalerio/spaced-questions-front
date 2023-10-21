import { UserState } from "../types";

export const isUserLogged = (state: UserState) => {
  const hasData = !!state.data;
  const isNotLoading = !state.loading;

  return hasData && isNotLoading;
};

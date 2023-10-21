import React from "react";
import { UserContext, UserDispatchContext } from "../UserProvider";
import {
  CreateUserDTO,
  UserDispatch,
  UserReducerTypes,
  UserState,
} from "../types";
import { requestCreateUser, requestUserLogin } from "../api/UserAPI";
import { isUserLogged } from "../utils/UserUtils";
import { UserAlreadyLoggedError } from "../errors";

const useUserContext = () => React.useContext(UserContext);

const useUserDispatch = () => React.useContext(UserDispatchContext);

export const useUserProvider = () => {
  const dispatch = useUserDispatch();
  const state = useUserContext();

  if (!dispatch) throw new Error("Must be Defined in a User Provider");

  return {
    state,
    actions: {
      loginUser: createLogoutUserAction(state, dispatch),
      logoutUser: createLoginUserAction(dispatch),
      createUser: createCreateUserAction(dispatch),
    },
  };
};

const { CREATE: CREATED, ERROR, LOADING, LOGIN, LOGOUT } = UserReducerTypes;

export const createLoginUserAction =
  (dispatch: UserDispatch) =>
  async (
    login: string,
    password: string,
    errorCallback?: (error: unknown) => void
  ): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestUserLogin(login, password);

      if (!response) throw new Error();

      localStorage.setItem("token", response.token);

      dispatch({
        type: LOGIN,
        payload: response.user,
      });
    } catch (error) {
      dispatch({ type: ERROR });
      if (errorCallback) errorCallback(error);
    }
  };

export const createCreateUserAction =
  (dispatch: UserDispatch) =>
  async (newUser: CreateUserDTO, errorCallback?: (error: unknown) => void) => {
    try {
      dispatch({ type: LOADING });

      await requestCreateUser(newUser);

      dispatch({ type: CREATED });
    } catch (error) {
      dispatch({ type: ERROR });
      if (errorCallback) errorCallback(error);
    }
  };

const createLogoutUserAction =
  (state: UserState, dispatch: UserDispatch) =>
  (errorCallback?: (error: unknown) => void) => {
    if (!isUserLogged(state)) {
      dispatch({ type: ERROR });
      if (errorCallback) errorCallback(new UserAlreadyLoggedError());
      return;
    }

    dispatch({ type: LOGOUT });
  };

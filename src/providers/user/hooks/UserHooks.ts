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
import { UserAlreadyLoggedError, UserWasNotLoggedError } from "../errors";

const useUserContext = () => React.useContext(UserContext);

const useUserDispatch = () => React.useContext(UserDispatchContext);

export const useUserProvider = () => {
  const dispatch = useUserDispatch();
  const state = useUserContext();

  if (!dispatch)
    throw new Error("Must be Defined in a User Provider Component");

  return {
    state,
    actions: {
      loginUser: createLoginUserAction(state, dispatch),
      logoutUser: createLogoutUserAction(state, dispatch),
      createUser: createCreateUserAction(dispatch),
    },
  };
};

const { CREATE: CREATED, ERROR, LOADING, LOGIN, LOGOUT } = UserReducerTypes;

export const createLoginUserAction =
  (state: UserState, dispatch: UserDispatch) =>
  async (login: string, password: string): Promise<void> => {
    try {
      if (isUserLogged(state)) {
        throw new UserAlreadyLoggedError();
      }

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
      throw error;
    }
  };

export const createCreateUserAction =
  (dispatch: UserDispatch) => async (newUser: CreateUserDTO) => {
    try {
      dispatch({ type: LOADING });

      await requestCreateUser(newUser);

      dispatch({ type: CREATED });
    } catch (error) {
      dispatch({ type: ERROR });
      throw error;
    }
  };

const createLogoutUserAction =
  (state: UserState, dispatch: UserDispatch) => () => {
    if (!isUserLogged(state)) {
      dispatch({ type: ERROR });
      throw new UserWasNotLoggedError();
    }

    dispatch({ type: LOGOUT });
  };

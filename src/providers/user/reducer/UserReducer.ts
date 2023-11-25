import { User, UserReducerTypes, UserReducers, UserState } from "../types";
import { removeLocalToken } from "../utils/UserUtils";

const { CREATE, ERROR, LOADING, LOGIN, LOGOUT } = UserReducerTypes;

export const userReducer = (state: UserState, action: UserReducers) => {
  switch (action.type) {
    case CREATE:
      return resetStateReducer();

    case LOGIN:
      return loginUserReducer(action.payload);

    case LOGOUT:
      return resetStateReducer();

    case ERROR:
      return resetStateReducer();

    case LOADING:
      return loadingUserReducer(state);

    default:
      return state;
  }
};

const resetStateReducer = (): UserState => {
  removeLocalToken();
  return { loading: false };
};

const loginUserReducer = (payload: User): UserState => {
  return { loading: false, data: payload };
};

const loadingUserReducer = (state: UserState): UserState => {
  return { ...state, loading: true };
};

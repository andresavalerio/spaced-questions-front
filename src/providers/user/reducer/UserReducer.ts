import { User, UserReducerTypes, UserReducers, UserState } from "../types";

export const userReducer = (state: UserState, action: UserReducers) => {
  switch (action.type) {
    case UserReducerTypes.CREATE:
      return createUserReducer();

    case UserReducerTypes.LOGIN:
      return loginUserReducer(action.payload);

    case UserReducerTypes.LOGOUT:
      return logoutUserReducer();

    case UserReducerTypes.ERROR:
      return errorUserReducer(state);

    case UserReducerTypes.LOADING:
      return loadingUserReducer(state);

    default:
      return state;
  }
};

const createUserReducer = (): UserState => ({ loading: false });

const loginUserReducer = (payload: User): UserState => {
  return {
    loading: false,
    ...payload,
  };
};

const logoutUserReducer = (): UserState => ({ loading: false });

const errorUserReducer = (state: UserState): UserState => ({
  ...state,
  loading: false,
});

const loadingUserReducer = (state: UserState): UserState => ({
  ...state,
  loading: true,
});

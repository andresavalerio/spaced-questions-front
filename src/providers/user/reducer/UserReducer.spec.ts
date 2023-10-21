import { User, UserReducerTypes, UserReducers, UserState } from "../types";
import { userReducer } from "./UserReducer";

const initalState: UserState = { loading: false };

const fakeUser: User = {
  active: true,
  createdAt: new Date(),
  email: "email",
  fullName: "fullName",
  username: "username",
  userRole: "Free",
};

const initalStateWithUser: UserState = {
  loading: false,
  data: fakeUser,
};

const expectStateToBeReseted = (state: UserState) => {
  expect(state.data).toBeUndefined();
  expect(state.loading).toBe(false);
};

describe("UserReducer", () => {
  it("should be defined", () => {
    expect(userReducer).toBeDefined();
  });

  describe("LOGIN", () => {
    it("should set logged user data", () => {
      const action: UserReducers = {
        type: UserReducerTypes.LOGIN,
        payload: fakeUser,
      };

      const newState = userReducer(initalState, action);

      expect(newState.loading).toBe(false);
      expect(newState.data).toBe(fakeUser);
    });
  });

  describe("CREATE", () => {
    it("should reset user state", () => {
      const action: UserReducers = {
        type: UserReducerTypes.CREATE,
      };

      const newState = userReducer(initalStateWithUser, action);

      expectStateToBeReseted(newState);
    });
  });

  describe("LOGOUT", () => {
    it("should reset user state", () => {
      const action: UserReducers = { type: UserReducerTypes.ERROR };

      const newState = userReducer(initalStateWithUser, action);

      expectStateToBeReseted(newState);
    });
  });

  describe("ERROR", () => {
    it("should reset user state", () => {
      const action: UserReducers = { type: UserReducerTypes.ERROR };

      const newState = userReducer(initalStateWithUser, action);

      expectStateToBeReseted(newState);
    });
  });

  describe("LOADING", () => {
    it("should set user state as loading true and remain old state", () => {
      const action: UserReducers = { type: UserReducerTypes.LOADING };

      const newState = userReducer(initalStateWithUser, action);

      expect(newState.loading).toBe(true);
      expect(newState.data).toBeDefined();
    });
  });
});

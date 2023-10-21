import { describe, it, expect } from "vitest";
import { isUserLogged } from "./UserUtils";
import { UserState } from "../types";

const userStateWhenLogged: UserState = {
  loading: false,
  data: {
    active: true,
    createdAt: new Date(),
    email: "email",
    fullName: "fullName",
    username: "username",
    userRole: "Free",
  },
};

describe("UserUtils", () => {
  describe("isUserLoggeed", () => {
    it("should return true if has user data and loading is false", () => {
      const result = isUserLogged(userStateWhenLogged);

      expect(result).toBe(true);
    });

    it("should return false if don't have user data and loading is false", () => {
      const userStateWithoutUserData: UserState = {
        ...userStateWhenLogged,
        data: undefined,
      };

      const result = isUserLogged(userStateWithoutUserData);

      expect(result).toBe(false);
    });

    it("should return false if has user data and loading is true", () => {
      const userStateWithUserDataAndLoading: UserState = {
        ...userStateWhenLogged,
        loading: true,
      };

      const result = isUserLogged(userStateWithUserDataAndLoading);

      expect(result).toBe(false);
    });

    it("should return false if don't have user data and loading is true", () => {
      const userStateWithoutUserDataAndLoading: UserState = {
        data: undefined,
        loading: true,
      };

      const result = isUserLogged(userStateWithoutUserDataAndLoading);

      expect(result).toBe(false);
    });
  });
});

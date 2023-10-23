import { describe, it, expect } from "vitest";
import { setupMockServer } from "helpers/tests";
import { requestCreateUser, requestUserLogin } from "./UserAPI";
import { userHandlers } from "./UserMockServer";
import {
  UserAlreadyExistsError,
  UserDontExistError,
  UserNotAuthorizedError,
} from "../errors";

describe("UserAPI", () => {
  setupMockServer(userHandlers);

  describe("requestUserLogin", () => {
    it("should login user, and receive token and user data", async () => {
      const response = await requestUserLogin("login", "password");

      expect(response).toBeDefined();
      expect(response?.user).toBeDefined();
      expect(response?.token).toBeDefined();
    });

    it("should not login user when password is wrong", async () => {
      try {
        await requestUserLogin("error", "password");
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotAuthorizedError);
      }
    });

    it("should not login user when them don't exists", async () => {
      try {
        await requestUserLogin("notfound", "password");
      } catch (error) {
        expect(error).toBeInstanceOf(UserDontExistError);
      }
    });
  });

  describe("requestCreateUser", () => {
    it("should create user when user don't exists", () => {
      const requestPromise = requestCreateUser({
        email: "email",
        fullName: "fullName",
        password: "password",
        username: "username",
      });

      expect(requestPromise).resolves.toBe(undefined);
    });

    it("should not create user when user already exists", () => {
      const requestPromise = requestCreateUser({
        email: "email",
        fullName: "fullName",
        password: "password",
        username: "username duplicate",
      });

      expect(requestPromise).rejects.toThrow(UserAlreadyExistsError);
    });
  });
});

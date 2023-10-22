import { describe, it, expect } from "vitest";
import { setupMockServer } from "helpers/tests";
import { requestCreateUser, requestUserLogin } from "./UserAPI";
import { userHandlers } from "./UserMockServer";
import { UserAlreadyExistsError, UserNotAuthorizedError } from "../errors";

describe("UserAPI", () => {
  setupMockServer(userHandlers);

  describe("requestUserLogin", () => {
    it("should login user, and receive token and user data", async () => {
      const response = await requestUserLogin("login", "password");

      expect(response).toBeDefined();
      expect(response?.user).toBeDefined();
      expect(response?.token).toBeDefined();
    });

    it("should not login user when him don't exists", async () => {
      const requestPromise = requestUserLogin("error", "password");

      expect(requestPromise).rejects.toThrow(UserNotAuthorizedError);
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

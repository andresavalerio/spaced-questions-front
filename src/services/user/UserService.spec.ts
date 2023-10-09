import { expect, describe, it, vi } from "vitest";
import { UserService } from "./UserService";
import { IUserClient, IUserService } from "../../types/User";

describe("UserService", () => {
  const tokenKey = "token-key";

  let userService: IUserService;
  let userClient: IUserClient;

  beforeAll(() => {
    userClient = {
      requestUserCreation: vi.fn(),
      requestUserLogin: vi.fn(),
    };

    userService = new UserService(userClient, tokenKey);
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("should be defined", () => {
    expect(userClient).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe("loginUser", () => {
    it("should return user data after login, and register on localStorage the data", async () => {
      vi.spyOn(userClient, "requestUserLogin").mockResolvedValue({
        token: "token",
        user: {
          active: true,
          createdAt: new Date(),
          email: "email",
          fullName: "full name",
          username: "username",
          userRole: "Free",
        },
      });

      const username = "VJCHAVE";
      const password = "123456";

      const response = await userService.loginUser(username, password);

      expect(localStorage.getItem(tokenKey)).toBe("token");
      expect(response).toBeDefined();
    });
  });

  describe("createUser", () => {
    it.todo("should return true if created");
  });
});

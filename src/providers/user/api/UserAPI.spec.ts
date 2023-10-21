import { describe, it, expect } from "vitest";
import { requestCreateUser, requestUserLogin } from "./UserAPI";
import { setupServer } from "msw/node";
import { rest } from "msw";

const handlers: RequestHandler[] = [rest.get("")];

const server = setupServer(...handlers);

describe("UserAPI", () => {
  describe("requestUserLogin", () => {
    it("should be defined", () => {
      expect(requestUserLogin);
    });
  });

  describe("requestCreateUser", () => {
    it("should be defined", () => {
      expect(requestCreateUser);
    });
  });
});

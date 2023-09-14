import { expect, describe, test } from "vitest";
import { ILoginServiceProvider, LoginService } from "./LoginService";

class FakeLoginServiceProvider implements ILoginServiceProvider {
  public postVerifyUser(username: string): Promise<{ username: string }> {
    return new Promise((resolve) => resolve({ username: String(username) }));
  }
}

describe("LoginService", () => {
  test("should return username", async () => {
    const username = "VJCHAVE";

    const service = new LoginService(new FakeLoginServiceProvider());

    const response = await service.verifyUser(username);

    expect(username, response.userData?.username);
  });
});

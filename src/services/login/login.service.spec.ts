// import { vi, test, describe, expect } from "vitest";
// import { LoginService } from "./login.service";
// import axios from "axios";

// vi.mock("axios", () => ({ post: vi.fn() }));

// describe("Users Service", () => {
//   describe("LoginService", () => {
//     test("makes a POST request to verify user", async () => {
//       const resultMock = {
//         success: true,
//         userData: { username: "VJCHAVE" },
//         msg: "User exists",
//       };

//       axios.post = vi.fn();

//       const service = new LoginService();

//       const result = await service.verifyUser("VJCHAVE");

//       expect(result).toStrictEqual(resultMock);
//     });
//   });
// });

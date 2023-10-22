import { act, renderHook, waitFor } from "@testing-library/react";
import { useUserProvider } from "./UserHooks";
import { UserProvider } from "../UserProvider";
import { ReactNode } from "react";
import { setupMockServer } from "helpers/tests";
import { userHandlers } from "../api/UserMockServer";
import { UserNotAuthorizedError, UserWasNotLoggedError } from "../errors";

const wrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

const renderUserHooks = () => renderHook(() => useUserProvider(), { wrapper });

describe("UserHooks", () => {
  setupMockServer(userHandlers);

  it("should render hook and it be defined", () => {
    const { result } = renderUserHooks();

    expect(result.current.state).toBeDefined();
    expect(result.current.actions).toBeDefined();
  });

  describe("loginUser", () => {
    it("should login user, and set at local storage the token", async () => {
      const { result } = renderUserHooks();

      act(() => {
        result.current.actions.loginUser("login", "password");
      });

      expect(result.current.state.loading).toBe(true);

      await waitFor(
        () => {
          const hasData = !!result.current.state.data;
          if (!hasData) throw new Error();
        },
        { timeout: 1500 }
      );

      expect(result.current.state.data).toBeDefined();
      expect(localStorage.getItem("token")).toBeDefined();
    });

    it("should not login user when there is an error", async () => {
      const { result } = renderUserHooks();

      const loginUserPromise = act(() =>
        result.current.actions.loginUser("error", "password")
      );

      try {
        await loginUserPromise;
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotAuthorizedError);
      }
    });
  });

  describe("logoutUser", () => {
    it("should not logout user when him is not logged", () => {
      const { result } = renderUserHooks();

      try {
        act(() => {
          return result.current.actions.logoutUser();
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UserWasNotLoggedError);
      }
    });
  });

  describe("createUser", () => {
    it("should render action and it be defined", () => {
      const { result } = renderUserHooks();

      expect(result.current.actions.createUser).toBeDefined();
    });
  });
});

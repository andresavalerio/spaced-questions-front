import { act, renderHook, waitFor } from "@testing-library/react";
import { useUserProvider } from "./UserHooks";
import { UserProvider } from "../UserProvider";
import { ReactNode } from "react";
import { setupMockServer } from "helpers/tests";
import { userServer } from "../api/UserMockServer";

const wrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

const renderUserHooks = () => renderHook(() => useUserProvider(), { wrapper });

describe("UserHooks", () => {
  setupMockServer(userServer);

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

      const errorCallback = vi.fn();

      act(() => {
        result.current.actions.loginUser("error", "password", errorCallback);
      });

      expect(result.current.state.loading).toBe(true);

      await waitFor(
        () => {
          const isLoading = !!result.current.state.loading;

          if (isLoading) throw new Error();
        },
        { timeout: 1500 }
      );

      expect(errorCallback).toBeCalled();
      expect(result.current.state.data).toBeUndefined();
    });
  });

  describe("logoutUser", () => {
    it("should logout user", () => {
      const { result } = renderUserHooks();

      act(() => {
        result.current.actions.logoutUser();
      });
    });
  });

  describe("createUser", () => {
    it("should render action and it be defined", () => {
      const { result } = renderUserHooks();

      expect(result.current.actions.createUser).toBeDefined();
    });
  });
});

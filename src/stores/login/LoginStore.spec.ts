import { act, renderHook } from "@testing-library/react-hooks";
import { describe, it, expect } from 'vitest'
import { createLoginStore } from "./LoginStore";

const useLoginStore = createLoginStore({
  postVerifyUser(username) {
    return new Promise((resolve) =>
      resolve({
        username,
      })
    );
  },
});

describe("useLoginStore", () => {
  it("value's initial value is 0", () => {
    const { result } = renderHook(() => useLoginStore());

    expect(result.current.username).toEqual("");
  });
  it("every time increment is called, value increases by one", () => {
    const { result } = renderHook(() => useLoginStore());

    act(() => result.current.setUser("VJCHAVE"));

    setTimeout(() => {
      expect("VJCHAVE").toEqual(result.current.username);
    }, 1000);
  });
});

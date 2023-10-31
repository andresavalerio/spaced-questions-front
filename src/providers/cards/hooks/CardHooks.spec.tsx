import { renderHook, waitFor } from "@testing-library/react";
import { useCardProvider } from "./CardHooks";
import { CardProvider } from "../CardProvider";
import { ReactNode } from "react";
import { setupMockServer } from "helpers/tests";
import { cardHandlers } from "../api/CardMockServer";
import { act } from "react-dom/test-utils";

describe(`CardHooks`, () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <CardProvider>{children}</CardProvider>
  );

  const renderCardHooks = () =>
    renderHook(() => useCardProvider(), {
      wrapper,
    });

  describe("", () => {
    setupMockServer(cardHandlers);

    it("renderHooks should render hooks and be defined", () => {
      const { result } = renderCardHooks();

      const cardState = result.current;
      expect(cardState).toBeDefined();
      expect(cardState).toHaveProperty("state");
      expect(cardState).toHaveProperty("actions");
    });

    it("getCards should return the hook with a cards value", async () => {
      const { result } = renderCardHooks();

      act(() => {
        result.current.actions.getCards("pedro", "testes");
      });

      expect(result).toHaveProperty('current.state.loading', true);

      await waitFor(
        () => {
            const hasData = !!result.current.state.data;
            if(!hasData) throw new Error();
        },
        { timeout: 1500 }
      )

      expect(result).toHaveProperty('current.state.data')
      expect(result.current.state.data).toHaveLength(10)
    });
  });

  it("" , () => {

  })

});

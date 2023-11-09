import { renderHook } from "@testing-library/react";
import { useNotebookProvider } from "./NotebookHooks";
import { UserProvider } from "../NotebookProvider";
import { ReactNode } from "react";
import { setupMockServer } from "helpers/tests";
import { notebookHandlers } from "../api/NotebookMockServer";
import { act } from "react-dom/test-utils";

const wrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

const renderNotebookHooks = () => renderHook(() => useNotebookProvider(), { wrapper });

describe("NotebookHooks", () => {
  setupMockServer(notebookHandlers);

  it("NotebookHooks should be rendered", () => {
    const { result } = renderNotebookHooks();

    expect(result.current.state).toBeDefined();
    expect(result.current.actions).toBeDefined();
  });

  describe("Get notebook", () => {

    it("should load owner's notebooks", async () => {
      const { result } = renderNotebookHooks();

      await act(async () => {
        await result.current.actions.defaultNotebooks("pedro");
      });

      expect(result.current.state).toHaveProperty("loading", false);
      expect(result.current.state.data).toBeDefined();
      expect(result.current.state.data).toHaveLength(4);
    });

    it("notebook hooks should get the notebook by notebook's name and owner", async () => {
      const { result } = renderNotebookHooks();

      await act(async () => {
        await result.current.actions.getNotebook("pedro", "Caderno de Física");
      });

      expect(result.current.state).toHaveProperty("loading", false);
      expect(result.current.state).toHaveProperty("data");
      expect(result.current.state.data![0]).toHaveProperty("name");
    });

  });

  describe("remove notebook", () => {
    it("should remove one notebook", async () => {
      const { result } = renderNotebookHooks();

      await act(async () => {
        await result.current.actions.deleteNotebook(
          "pedro",
          "Caderno de Física"
        );
      });

      expect(result.current.state).toHaveProperty("loading", false);
      expect(result.current.state).toHaveProperty("data", undefined);
    });
  });
});

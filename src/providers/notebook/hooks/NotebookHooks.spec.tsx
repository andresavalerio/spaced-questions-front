import { renderHook } from "@testing-library/react";
import { useNotebookProvider } from "./NotebookHooks";
import { NotebookProvider } from "../NotebookProvider";
import { ReactNode } from "react";
import { setupMockServer } from "helpers/tests";
import { notebookHandlers } from "../api/NotebookMockServer";
import { act } from "react-dom/test-utils";
import { Notebook } from "../types";

const wrapper = ({ children }: { children: ReactNode }) => (
  <NotebookProvider>{children}</NotebookProvider>
);

const renderNotebookHooks = () =>
  renderHook(() => useNotebookProvider(), { wrapper });

const notebookTemplate: Notebook = {
  id: 111,
  name: "caderno de geo",
  owner: "Pedro",
  content: "Mucho texto meu amigo",
};

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

  describe("create notebook", () => {
    it("should create a notebook", async () => {
      const { result } = renderNotebookHooks();
      await act(async () => {
        await result.current.actions.createNotebook(notebookTemplate);
      });

      expect(result.current.state).toHaveProperty("loading", false);
      expect(result.current.state.data).toBeDefined();
      expect(result.current.state.data![0]).toHaveProperty(
        "name",
        "caderno de geo"
      );
      expect(result.current.state.data![0]).toHaveProperty("owner", "Pedro");
      expect(result.current.state.data![0]).toHaveProperty(
        "content",
        "Mucho texto meu amigo"
      );
    });
  });

  describe("rename notebook", () => {
    it("should rename a notebook", async () => {
      const { result } = renderNotebookHooks();
      const currentNotebookName = "Caderno de Ciência";
      await act(async () => {
        await result.current.actions.renameNotebook(
          "pedro",
          currentNotebookName,
          "Caderno de outro assunto"
        );
      });
      expect(result.current.state.loading).toBe(false);
      expect(result.current.state.data).toBeDefined();

      expect(result.current.state.data![0]).toHaveProperty("owner", "pedro");
      expect(result.current.state.data![0]).toHaveProperty(
        "name",
        "Caderno de outro assunto"
      );
    });
  });
});

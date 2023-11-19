import { act } from "react-dom/test-utils";
import { Notebook } from "../types";
import { ReactNode } from "react";
import { renderHook } from "@testing-library/react";
import { setupMockServer } from "helpers/tests";
import { NotebookProvider } from "../NotebookProvider";
import { notebookHandlers } from "../api/NotebookMockServer";
import { useNotebookProvider } from "./NotebookHooks";

const wrapper = ({ children }: { children: ReactNode }) => (
  <NotebookProvider>{children}</NotebookProvider>
);

const renderNotebookHooks = () =>
  renderHook(() => useNotebookProvider(), { wrapper });

const notebookTemplate: Notebook = {
  id: 111,
  name: "caderno de geo",
  owner: "Pedro",
  content: "Muito texto meu amigo",
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
        await result.current.actions.loadNotebooks("pedro");
      });

      expect(result.current.state).toHaveProperty("loading", false);
      expect(result.current.state.data).toBeDefined();
      expect(result.current.state.data).toHaveLength(4);
    });

    it("notebook hooks should get the notebook by notebook's name and owner", async () => {
      const { result } = renderNotebookHooks();

      await act(async () => {
        await result.current.actions.getNotebookById("pedro", 4);
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
        await result.current.actions.deleteNotebookById("pedro", 4);
      });

      expect(result.current.state).toHaveProperty("loading", false);
      expect(result.current.state).toHaveProperty("data", []);
    });
  });

  describe("create notebook", () => {
    it("should create a notebook", async () => {
      const { result } = renderNotebookHooks();
      await act(async () => {
        await result.current.actions.createNotebook(
          notebookTemplate.name,
          notebookTemplate.owner as string
        );
      });

      const state = result.current.state;

      const { data } = state;

      expect(state).toHaveProperty("loading", false);

      expect(data).toBeDefined();

      expect(data![0]).toHaveProperty("name", "caderno de geo");
      expect(data![0]).toHaveProperty("owner", "Pedro");
    });
  });

  describe("rename notebook", () => {
    it("should rename a notebook", async () => {
      const { result } = renderNotebookHooks();

      const newName = "Caderno de outro assunto";
      const owner = "pedro";
      const notebookId = 1;

      await act(async () => {
        const { loadNotebooks } = result.current.actions;

        await loadNotebooks(owner);
      });

      await act(async () => {
        const updateData = { newName };

        const { updateNotebook } = result.current.actions;

        await updateNotebook(owner, notebookId, updateData);
      });

      const { loading, data } = result.current.state;

      expect(data).toBeDefined();
      expect(loading).toBe(false);

      const firstData = data![0];

      expect(firstData).toHaveProperty("owner", owner);
      expect(firstData).toHaveProperty("name", newName);
    });
  });

  describe("update notebook", () => {
    it("should update a notebook", async () => {
      const { result } = renderNotebookHooks();

      const owner = "pedro";
      const notebookId = 1;
      const newContent = "Muito Conhecimento";

      await act(async () => {
        const { loadNotebooks } = result.current.actions;

        await loadNotebooks(owner);
      });

      await act(async () => {
        const updateData = { newContent };

        const { updateNotebook } = result.current.actions;

        await updateNotebook(owner, notebookId, updateData);
      });

      const state = result.current.state;

      expect(state.loading).toBe(false);
      expect(state.data).toBeDefined();

      const firstData = state.data![0];

      expect(firstData).toHaveProperty("owner", "pedro");
      expect(firstData).toHaveProperty("content", newContent);
    });
  });
});

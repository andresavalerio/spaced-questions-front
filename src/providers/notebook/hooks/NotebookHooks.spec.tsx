import { renderHook } from "@testing-library/react";
import { useNotebookProvider } from "./NotebookHooks";
import { UserProvider } from "../NotebookProvider";
import { ReactNode } from "react";
import { setupMockServer } from "helpers/tests";
import { notebookHandlers } from "../api/NotebookMockServer";

const wrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

const renderNotebookHooks = () =>
  renderHook(() => useNotebookProvider(), { wrapper });

describe("NotebookHooks", () => {
  setupMockServer(notebookHandlers);
});

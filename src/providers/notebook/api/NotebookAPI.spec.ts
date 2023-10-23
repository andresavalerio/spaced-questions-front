import { setupMockServer } from "helpers/tests";
import { notebookHandlers } from "./NotebookMockServer";

describe("NotebookAPI", () => {
  setupMockServer(notebookHandlers);
});

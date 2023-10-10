import { expect, describe, test } from "vitest";
import {
  NotebookService,
  INotebookServiceProvider,
  Notebook,
} from "./NotebookService";

class FakeNotebookServiceProvider implements INotebookServiceProvider {
  getNotebooks(): Promise<Notebook[]> {
    return new Promise((resolve) => {
      resolve([{ activate: false, name: "a", username: "b" }]);
    });
  }
}

const service = new NotebookService(new FakeNotebookServiceProvider());

describe("NotebookService", () => {
  test("should return zero notebooks", async () => {
    const notebooks = await service.getActiveNotebooks();

    expect(notebooks.length).toBe(0);
  });
});

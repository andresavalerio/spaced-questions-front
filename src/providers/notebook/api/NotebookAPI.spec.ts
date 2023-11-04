import { setupMockServer } from "helpers/tests";
import { notebookHandlers } from "./NotebookMockServer";
import { requestUserNotebooks, requestCreateNotebook, requestDeleteNotebook } from "./NotebookAPI";

describe("NotebookAPI", () => {
  setupMockServer(notebookHandlers);

  describe("RequestNotebook", () => {
    it("Should return valid notebook", async () => {
      const response = await requestUserNotebooks("LoginDeTeste");

      expect(response).toBeDefined();

      expect(response.notebooks).toHaveLength(4);

      expect(response.notebooks[0].id).toBe(1);

      expect(response.notebooks[0].name).toBe("Caderno de Matematica");

    })
  })

  describe("CreateNotebook", () => {
    it("should create a new notebook", async () => {
      const requestPromise = requestCreateNotebook({
        id: 1,
        name: "NameToTest",
        owner: "OwnerToTest",
      });

      expect(requestPromise).resolves.toBe(undefined);

      const response = await requestUserNotebooks("LoginDeTeste");

      expect(response.notebooks).toHaveLength(5);
    });

  });

  describe("DeleteNotebook", () => {
    it("should delete the notebook", async () => {
      const response = await requestDeleteNotebook("LoginDeTeste", "Caderno de Física");

      expect(response).toBe(200);
    
      const responseDeletion = await requestUserNotebooks("LoginDeTeste");

      expect(responseDeletion.notebooks).toHaveLength(3);
    })
  });
});


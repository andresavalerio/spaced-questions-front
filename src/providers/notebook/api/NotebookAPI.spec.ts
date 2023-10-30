import { setupMockServer } from "helpers/tests";
import { notebookHandlers } from "./NotebookMockServer";
import { requestUserNotebook, requestCreateNotebook, requestDeleteNotebook } from "./NotebookAPI";

describe("NotebookAPI", () => {
  setupMockServer(notebookHandlers);

  describe("RequestNotebook", () => {


    it("Should return valid notebook", async () => {
      const response = await requestUserNotebook("LoginDeTeste");

      expect(response).toBeDefined();

      expect(response.notebooks).toHaveLength(4);

      expect(response.notebooks[0].id).toBe(1);

      expect(response.notebooks[0].name).toBe("Caderno de Matematica");

    })
  })

  describe("CreateNotebook", () => {
    it("should create a new notebook", () => {
      const requestPromise = requestCreateNotebook({
        id: 1,
        name: "NameToTest",
        owner: "OwnerToTest",
      });

      expect(requestPromise).resolves.toBe(undefined);
    });
  });

  describe("DeleteNotebook", () => {
    it("should delete a notebook", async () => {
      const response = await requestDeleteNotebook("LoginDeTeste");

      expect(response.notebooks[1]).toBeDefined();

    });
  });
});


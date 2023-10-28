import { setupMockServer } from "helpers/tests";
import { notebookHandlers } from "./NotebookMockServer";
import { requestUserNotebook } from "./NotebookAPI";

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

  describe("CreateNotebook", () =>{
    const response = await create



  })
});
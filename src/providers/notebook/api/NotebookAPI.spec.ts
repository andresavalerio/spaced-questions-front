import { setupMockServer } from "helpers/tests";
import {
  requestUserNotebooks,
  requestCreateNotebook,
  requestDeleteNotebook,
  requestNotebookByName,
  requestRenameNotebook,
  getNotebooksByOwner,
} from "./NotebookAPI";
import * as fetching from "helpers/fetch";
import { notebookHandlers } from "./NotebookMockServer";
import { Notebook } from "../types";

/*
const NotebookTemplate: Notebook = {
  id: 111,
  name: "caderno de geo",
  owner: "Pedro",
  content: "Mucho texto meu amigo",
};
*/

describe("NotebookAPI", () => {
  setupMockServer(notebookHandlers);
  const fetchingMock = vi.spyOn(fetching, "fetchAPI");

  beforeEach(() => {
    fetchingMock.mockClear();
  });

  describe("Contract definitions(requests spied) with backend", () => {
    describe("RequestNotebook", () => {
      it("Should calls one valid notebook using owner's name and notebook's name", async () => {
        const owner = "pedro";
        const notebookName = "Caderno de Português";

        await requestNotebookByName("pedro", "Caderno de Português");

        expect(fetchingMock).toHaveBeenCalledOnce();
        expect(fetchingMock).toBeCalledWith(
          `/notebook/${owner}/${notebookName}`
        );
      });

      it("Should request all notebooks of one owner", async () => {
        const owner = "pedro";

        await requestUserNotebooks(owner);

        expect(fetchingMock).toHaveBeenCalledOnce();
        expect(fetchingMock).toHaveBeenCalledWith(`/notebooks/${owner}`);
      });
    });

    it("Should request for notebook creating wiht valid http request", async () => {
      const newNotebook: Notebook = {
        id: 1,
        name: "NameToTest",
        owner: "OwnerToTest",
        content: "empty",
      };

      const requestBody: RequestInit = {
        method: "POST",
        body: JSON.stringify(newNotebook),
      };

      await requestCreateNotebook(newNotebook);

      expect(fetchingMock).toHaveBeenCalledOnce();

      const fetchAPIUsedParameter = fetchingMock.mock.calls[0];

      expect(fetchAPIUsedParameter[0]).toBe(`/notebooks`);
      expect(fetchAPIUsedParameter[1]).toMatchObject(requestBody);
    });

    it("Should request for notebook deletetion with valid http request", async () => {
      const owner = "pedro";
      const notebooksName = "Caderno de Física";

      const httpDeleteMethod = {
        method: "DELETE",
      };

      await requestDeleteNotebook(owner, notebooksName);

      expect(fetchingMock).toHaveBeenCalledOnce();

      const fetchAPIUsedParameter = fetchingMock.mock.calls[0];

      expect(fetchAPIUsedParameter[0]).toBe(
        `/notebooks/${owner}/${notebooksName}`
      );
      expect(fetchAPIUsedParameter[1]).toMatchObject(httpDeleteMethod);
    });
  });

  describe("API retuns with fake server", () => {
    describe("CreateNotebook", () => {
      it("should create a new notebook", async () => {
        const newNotebook: Notebook = {
          id: 1,
          name: "NameToTest",
          owner: "OwnerToTest",
          content: "empty",
        };

        const response = await requestCreateNotebook(newNotebook);

        expect(response.notebook[0]).toEqual(newNotebook);
      });
    });

    describe("DeleteNotebook", () => {
      it("should delete the notebook", async () => {
        const owner = "pedro";
        const notebooksName = "Caderno de Física";

        const response = await requestDeleteNotebook(owner, notebooksName);

        expect(response).toBe(200);

        const responseDeletion = await requestUserNotebooks(owner);

        expect(responseDeletion.notebook).toHaveLength(3);
      });
    });

    describe("RenameNotebook", () => {
      it("Should request for a notebook to be renamed", async () => {
        const owner = "pedro";
        const newName = "NewNameToTest";
        
        const notebookToBeRenamed = await requestNotebookByName(owner, "Caderno de Português");
        const response = await requestRenameNotebook(owner, notebookToBeRenamed.notebook[0], newName);

        expect(response.notebook[0].newName).toBe("NewNameToTest");
        expect(response.notebook[0].owner).toBe("pedro");                
      });
    });
  });
});

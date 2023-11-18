import { setupMockServer } from "helpers/tests";
import {
  requestNotebooksByOwner,
  requestCreateNotebook,
  requestDeleteNotebook,
  requestNotebookById,
  requestNotebookUpdate,
} from "./NotebookAPI";
import * as fetching from "helpers/fetch";
import { notebookHandlers, resetMockServer } from "./NotebookMockServer";
import { Notebook, UpdateNotebookDTO } from "../types";

describe("NotebookAPI", () => {
  setupMockServer(notebookHandlers);
  const fetchingMock = vi.spyOn(fetching, "fetchAPI");

  beforeEach(() => {
    fetchingMock.mockClear();
    resetMockServer()
  });

  describe("Contract definitions(requests spied) with backend", () => {
    describe("RequestNotebook", () => {
      it("Should calls one valid notebook using owner's name and notebook's id", async () => {
        const owner = "pedro";
        const notebookId = 3;

        const httpGetMethod: RequestInit = {
          method: "GET",
        };

        await requestNotebookById("pedro", notebookId);

        expect(fetchingMock).toHaveBeenCalledOnce();
        expect(fetchingMock).toBeCalledWith(`/notebook/${owner}/${notebookId}`);
      });

      it("Should request all notebooks of one owner", async () => {
        const owner = "pedro";

        await requestNotebooksByOwner(owner);

        expect(fetchingMock).toHaveBeenCalledOnce();
        expect(fetchingMock).toHaveBeenCalledWith(`/notebooks/${owner}`);
      });
    });

    describe("Requesting Notebook Alteration", () => {
      it("Should request for notebook creating wiht valid http request", async () => {
        const newNotebookName = "NameToTest";
        const newNotebookOwner = "OwnerToTest";

        const requestBody: RequestInit = {
          method: "POST",
          body: JSON.stringify({
            name: newNotebookName,
            owner: newNotebookOwner,
          }),
        };

        await requestCreateNotebook(newNotebookName, newNotebookOwner);

        expect(fetchingMock).toHaveBeenCalledOnce();

        const fetchAPIUsedParameter = fetchingMock.mock.calls[0];

        expect(fetchAPIUsedParameter[0]).toBe(`/notebooks`);
        expect(fetchAPIUsedParameter[1]).toMatchObject(requestBody);
      });

      it("Should request for notebook deletetion with valid http request", async () => {
        const notebookOwner = "pedro";
        const notebookId = 4;

        const httpDeleteMethod = {
          method: "DELETE",
        };

        await requestDeleteNotebook(notebookOwner, notebookId);

        expect(fetchingMock).toHaveBeenCalledOnce();

        const fetchAPIUsedParameter = fetchingMock.mock.calls[0];

        expect(fetchAPIUsedParameter[0]).toBe(
          `/notebooks/${notebookOwner}/${notebookId}`
        );
        expect(fetchAPIUsedParameter[1]).toMatchObject(httpDeleteMethod);
      });
    });
  });

  describe("API retuns with fake server", () => {
    describe("CreateNotebook", () => {
      it("should create a new notebook", async () => {
        const newNotebookName = "NameToTest";
        const newNotebookOwner = "OwnerToTest";

        const response = await requestCreateNotebook(
          newNotebookName,
          newNotebookOwner
        );

        expect(response.notebook[0]).toHaveProperty("name", newNotebookName);
        expect(response.notebook[0]).toHaveProperty("owner", newNotebookOwner);
        expect(response.notebook[0]).not.toHaveProperty("content");
      });
    });

    describe("DeleteNotebook", () => {
      it("should delete the notebook", async () => {
        const notebookOwner = "pedro";
        const notebooksId = 4;

        const response = await requestDeleteNotebook(
          notebookOwner,
          notebooksId
        );

        const responseDeletion = await requestNotebooksByOwner(notebookOwner);

        expect(responseDeletion.notebook).toHaveLength(3);
      });
    });

    describe("Update Notebook", () => {
      it("Should request for a notebook to be renamed", async () => {
        const updateNotebookOwner = "pedro";
        const updateNotebookId = 4;

        const updateNotebookData: UpdateNotebookDTO = {
          newName: "New Name Here"
        }

        const response = await requestNotebookUpdate(updateNotebookOwner, updateNotebookId, updateNotebookData);
        console.log(response.notebook)
        expect(response.notebook).toHaveLength(1);
        expect(response.notebook[0].owner).toBe("pedro");
        expect(response.notebook[0].name).toBe("New Name Here");
      });
      
      it("Should request for a notebook to content to be updated", async () => {
        const updateNotebookOwner = "pedro";
        const updateNotebookId = 4;

        const updateNotebookData: UpdateNotebookDTO = {
          newContent:"Newer content here my mates"
        }

        const response = await requestNotebookUpdate(updateNotebookOwner, updateNotebookId, updateNotebookData);
        console.log(response.notebook)
        expect(response.notebook).toHaveLength(1);
        expect(response.notebook[0].owner).toBe("pedro");
        expect(response.notebook[0].name).toBe("Caderno de Física");
        expect(response.notebook[0].content).toBe("Newer content here my mates");
      });
      
      it("Should request for a notebook to content and name to be updated", async () => {
        const updateNotebookOwner = "pedro";
        const updateNotebookId = 2;

        const updateNotebookData: UpdateNotebookDTO = {
          newName: "Now We Extrapolate",
          newContent:"Remaking every thing"
        }

        const response = await requestNotebookUpdate(updateNotebookOwner, updateNotebookId, updateNotebookData);
        console.log(response.notebook)
        expect(response.notebook).toHaveLength(1);
        expect(response.notebook[0].owner).toBe("pedro");
        expect(response.notebook[0].name).toBe("Now We Extrapolate");
        expect(response.notebook[0].content).toBe("Remaking every thing");
      });
    });
  });
});

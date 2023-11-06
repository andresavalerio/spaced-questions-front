import { setupMockServer } from "helpers/tests";
import {
  requestUserNotebooks,
  requestCreateNotebook,
  requestDeleteNotebook,
  requestNotebookByName,
} from "./NotebookAPI";
import * as fetching from "helpers/fetch";
import { notebookHandlers } from "./NotebookMockServer";

const fetchingMock = vi.spyOn(fetching, "fetchAPI");

describe("NotebookAPI", () => {
  setupMockServer(notebookHandlers);

  beforeEach(() => {
    fetchingMock.mockClear();
  });

  describe("RequestNotebook", () => {
    it("Should return one valid notebook using owner's name and notebook's name", async () => {
      const owner = "pedro";
      const notebookName = "Caderno de Português";

      await requestNotebookByName("pedro", "Caderno de Português");

      expect(fetchingMock).toHaveBeenCalledOnce();
      expect(fetchingMock).toBeCalledWith(`/notebook/${owner}/${notebookName}`);
    });

    it("Should return valid notebooks", async () => {
      const owner = "pedro";

      await requestUserNotebooks(owner);

      expect(fetchingMock).toHaveBeenCalledOnce();
      expect(fetchingMock).toHaveBeenCalledWith(`/notebooks/${owner}`);
    });
  });

  describe("CreateNotebook", () => {
    it("should create a new notebook", async () => {
      const newNotebook = {
        id: 1,
        name: "NameToTest",
        owner: "OwnerToTest",
      };

      const requestBody: RequestInit = {
        method: "POST",
        body: JSON.stringify(newNotebook),
      };

      const response = await requestCreateNotebook(newNotebook);

      expect(fetchingMock).toHaveBeenCalledOnce();

      const fetchAPIUsedParameter = fetchingMock.mock.calls[0];

      expect(fetchAPIUsedParameter[0]).toBe(`/notebooks`);
      expect(fetchAPIUsedParameter[1]).toMatchObject(requestBody);

      expect(response.notebook).toEqual(newNotebook)
    });
  });

  describe("DeleteNotebook", () => {
    it("should delete the notebook", async () => {
      const owner = "pedro";
      const notebooksName = "Caderno de Física";

      const httpDeleteMethod = {
        method: "DELETE",
      };

      const response = await requestDeleteNotebook(owner, notebooksName);

      expect(fetchingMock).toHaveBeenCalledOnce();

      const fetchAPIUsedParameter = fetchingMock.mock.calls[0];

      expect(fetchAPIUsedParameter[0]).toBe(
        `/notebooks/${owner}/${notebooksName}`
      );
      expect(fetchAPIUsedParameter[1]).toMatchObject(httpDeleteMethod);

      expect(response).toBe(200);
      const responseDeletion = await requestUserNotebooks(owner);
      expect(responseDeletion.notebooks).toHaveLength(3);
    });
  });
});

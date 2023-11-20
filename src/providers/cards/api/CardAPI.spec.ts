import { setupMockServer } from "helpers/tests";
import { requestCardFromUserNotebook } from "./CardAPI";
import { cardHandlers } from "./CardMockServer";
import * as fetching from "helpers/fetch";

describe(`card API`, () => {
  setupMockServer(cardHandlers);

  describe(`Card API request characteristics(contract with back)`, () => {
    const fetchingMock = vi.spyOn(fetching, "fetchAPI");

    beforeEach(() => {
      fetchingMock.mockClear();
      //   resetMockServer();
    });

    it(`Should request for the cards from owner pedro based on the notebook of 'fisics'`, async () => {
      const owner = "pedro";
      const notebookId = 4;

      await requestCardFromUserNotebook(owner, notebookId);

      expect(fetchingMock).toHaveBeenCalledOnce();
      expect(fetchingMock).toBeCalledWith(`/user/cards/${owner}/${notebookId}`);
    });

    it(`Should request for the cards from owner pedro based on the notebook of 'fisic' with id as string`, async () => {
      const owner = "pedro";
      const notebookId = "4";

      await requestCardFromUserNotebook(owner, notebookId);

      expect(fetchingMock).toHaveBeenCalledOnce();
      expect(fetchingMock).toBeCalledWith(`/user/cards/${owner}/${notebookId}`);
    });
  });

  describe(`Card API get notebooks cards`, () => {
    it(`Card API request cards of student`, async () => {
      const owner = "pedro";
      const notebookId = 5;

      const response = await requestCardFromUserNotebook(owner, notebookId);

      const userNotebooksName = response.notebook;
      const userCards = response.cards;

      expect(response).toBeDefined();
      expect(userNotebooksName).toBe("Acceptance Tests");
      expect(userCards).toHaveLength(10);
    });

    it(`Card API request cards of inexistent student`, async () => {
      const login = "joe doe";
      const notebook = "thinking";

      expect(requestCardFromUserNotebook(login, notebook)).rejects.toThrow(
        `The user ${login} dosn't exist`
      );
    });

    it(`Card API request of an inexistent user notebook`, async () => {
      const login = "pedro";
      const notebook = "none";

      expect(requestCardFromUserNotebook(login, notebook)).rejects.toThrow(
        `Bad Request`
      );
    });
  });
});

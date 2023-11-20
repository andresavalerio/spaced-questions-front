import { setupMockServer } from "helpers/tests";
import { requestCardAlteraion, requestCardFromUserNotebook } from "./CardAPI";
import { cardHandlers } from "./CardMockServer";
import * as fetching from "helpers/fetch";
import { CardQuestionModification } from "../types";

describe(`card API`, () => {
  setupMockServer(cardHandlers);

  describe(`Card API request characteristics(contract with back)`, () => {
    const fetchingMockApi = vi.spyOn(fetching, "fetchAPI");

    beforeEach(() => {
      fetchingMockApi.mockClear();
      //   resetMockServer();
    });

    it(`Should request for the cards from owner pedro based on the notebook of 'fisics'`, async () => {
      const owner = "pedro";
      const notebookId = 4;

      await requestCardFromUserNotebook(owner, notebookId);

      expect(fetchingMockApi).toHaveBeenCalledOnce();
      expect(fetchingMockApi).toBeCalledWith(
        `/user/cards/${owner}/${notebookId}`
      );
    });

    it(`Should request for the cards from owner pedro based on the notebook of 'fisic' with id as string`, async () => {
      const owner = "pedro";
      const notebookId = "4";

      await requestCardFromUserNotebook(owner, notebookId);

      expect(fetchingMockApi).toHaveBeenCalledOnce();
      expect(fetchingMockApi).toBeCalledWith(
        `/user/cards/${owner}/${notebookId}`
      );
    });

    it("should request for the card question, from owner pedro, to be altered based on the request changes", async () => {
      const owner = "pedro";
      const cardId = 3;

      const cardQuestionModification = {
        questionModification: "more clear an precise card question",
      } as CardQuestionModification;

      const httpPatchMethod: RequestInit = {
        method: "PATCH",
      };

      await requestCardAlteraion(owner, cardId, cardQuestionModification);

      expect(fetchingMockApi).toHaveBeenCalledOnce();

      const fetchAPIUsedParameter = fetchingMockApi.mock.calls[0];

      expect(fetchAPIUsedParameter[0]).toBe(`/user/cards/${owner}/${cardId}`);
      expect(fetchAPIUsedParameter[1]).toMatchObject(httpPatchMethod);
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

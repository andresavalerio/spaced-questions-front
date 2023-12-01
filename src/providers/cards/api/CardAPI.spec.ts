import { setupMockServer } from "helpers/tests";
import {
  classifyRightOrWrongAnswer,
  requestCardFromUserNotebook,
} from "./CardAPI";
import { cardHandlers } from "./CardMockServer";

describe(`card API`, () => {
  setupMockServer(cardHandlers);

  describe(`Card API get notebooks cards`, () => {
    describe("Card API request cards", () => {
      it(`Card API request cards of student`, async () => {
        const login = "pedro";
        const notebook = "Acceptance Tests";

        const response = await requestCardFromUserNotebook(login, notebook);

        const userCards = response;

        expect(response).toBeDefined();
        expect(userCards[0].question).toBe("0");
        expect(userCards[0].answer).toBe("1");
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

    describe("Card API to evaluate if user answered right", () => {
      it("Card Should evaluate if the user got the answer right or wrong", () => {
        const login = "pedro";
        const cardId = "12";

        expect(classifyRightOrWrongAnswer(login, cardId, true)).resolves.toBe(
          200
        );
      });
    });
  });
});

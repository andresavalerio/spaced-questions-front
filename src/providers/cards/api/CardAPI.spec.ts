import { setupMockServer } from "helpers/tests";
import { requestCardFromUserNotebook } from "./CardAPI";
import { cardHandlers } from "./CardMockServer";

describe(`card API`, () => {
    
  setupMockServer(cardHandlers)

  describe(`Card API get notebooks cards`, () => {
    
    it(`Card API request cards of student`, async () => {
        const login = "pedro";
        const notebook = "Acceptance Tests"
    
        const response = await requestCardFromUserNotebook(login, notebook);
    
        const userNotebooksName = response.notebook;
        const userCards = response.cards;
    
        expect(response).toBeDefined();
        expect(userNotebooksName).toBe("Acceptance Tests")
        expect(userCards).toHaveLength(10);
    })
    
    it(`Card API request cards of inexistent student`, async () => {
        const login = "joe doe";
        const notebook = "thinking"
    
        expect( 
           requestCardFromUserNotebook(login, notebook)
        ).rejects.toThrow(`The user ${login} dosn't exist`)
    })
    
    it(`Card API request of an inexistent user notebook`, async () => {
        const login = "pedro";
        const notebook = "none"
    
        expect( 
           requestCardFromUserNotebook(login, notebook)
        ).rejects.toThrow(`Bad Request`)
    })
    
  });
})
import { setupMockServer } from "helpers/tests";
import { cardHandlers } from "../api/CardMockServer";
import { cardLoader } from "./card-loader";

describe("Card Loader", () => {
  
  setupMockServer(cardHandlers);

  it("Card loader should return the list of cards after the resulof the ", async () => {
    const cards = await cardLoader();


    expect(cards).toHaveLength(10);
    cards.forEach((card) => {
      expect(card).toHaveProperty('answer');
    });
  });

  it.todo("Card loader should call from cash memory on secon call prior to a 15 second inteval", async () => {
   
   

  })

  it.todo("Card loader should call from from database on secon call after a 1 second inteval", async () => {
    
  })
});

export class CardModel {
  private _question = "";
  private _answer = "";

  public get question() {
    return this._question;
  }

  public get answer() {
    return this._answer;
  }

  constructor(question: string, answer: string) {
    this._question = question;
    this._answer = answer;
  }
}

export type GetCardsAPIResponse = {
  notebook: string;
  cards: CardModel[];
};

export type UserCardDTO = {
  user: string,
  notebook: string
}
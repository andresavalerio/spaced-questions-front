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
  user: string;
  notebook: string;
};

export type CardState = {
  data?: CardModel[],
  loading: boolean;
}

export enum CardsReducerTypes {
  CREATE,
  LOADING,
  LOADED,
  ERROR,
}

type CardCreateReducer = {
  type: CardsReducerTypes.CREATE,
  payload?: undefined
}

type CardLoadingReducer = {
  type: CardsReducerTypes.LOADING,
  payload?: undefined
}

type CardLoadedReducer = {
  type: CardsReducerTypes.LOADED,
  payload: CardModel[] 
}

type CardErrorReducer = {
  type: CardsReducerTypes.ERROR,
  payload?: undefined
}

export type CardsReducer = 
  | CardCreateReducer
  | CardLoadingReducer
  | CardLoadedReducer
  | CardErrorReducer

export type CardDispatch = React.Dispatch<CardsReducer>;
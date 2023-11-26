export type Card = {
  question: string;
  answer: string;
};

export type GetCardsAPIResponse = Card[];

export type UserCardDTO = {
  user: string;
  notebook: string;
};

export type CardState = {
  data?: Card[];
  loading: boolean;
};

export enum CardsReducerTypes {
  CREATE,
  LOADING,
  LOADED,
  ERROR,
}

type CardCreateReducer = {
  type: CardsReducerTypes.CREATE;
  payload?: undefined;
};

type CardLoadingReducer = {
  type: CardsReducerTypes.LOADING;
  payload?: undefined;
};

type CardLoadedReducer = {
  type: CardsReducerTypes.LOADED;
  payload: Card[];
};

type CardErrorReducer = {
  type: CardsReducerTypes.ERROR;
  payload?: undefined;
};

export type CardsReducer =
  | CardCreateReducer
  | CardLoadingReducer
  | CardLoadedReducer
  | CardErrorReducer;

export type CardDispatch = React.Dispatch<CardsReducer>;

import {
  Card,
  CardState,
  CardsReducer,
  CardsReducerTypes,
} from "../types";

const { CREATE, LOADING, LOADED, ERROR } = CardsReducerTypes;

export const cardsReducer = (state: CardState, action: CardsReducer) => {
  switch (action.type) {
    case CREATE:
      return resetStateReducer();
    case LOADING:
      return loadingCardsReducer(state);
    case LOADED:
      return userCardsReducer(action.payload);
    case ERROR:
      return resetStateReducer();
    default:
      return state;
  }
};

const resetStateReducer = (): CardState => {
  return { loading: false };
};

const userCardsReducer = (payload: Card[]): CardState => {
  return { loading: false, data: payload };
};

const loadingCardsReducer = (state: CardState): CardState => {
  return { ...state, loading: true };
};

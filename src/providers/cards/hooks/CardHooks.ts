import React from "react";
import { CardContext, CardDispatchContext } from "../CardProvider";
import { CardDispatch, CardState, CardsReducerTypes } from "../types";
import { requestCardFromUserNotebook } from "../api/CardAPI";

const useCardContext = () => React.useContext(CardContext);

const useCardDispatch = () => React.useContext(CardDispatchContext);

export const useCardProvider = () => {
  const dispatch = useCardDispatch();
  const state = useCardContext();

  return {
    state,
    actions: {
        getCards: getCards(state, dispatch)
    },
  };
};

const { CREATE, LOADED, LOADING, ERROR } = CardsReducerTypes;

export const getCards =
  (state: CardState, dispatch: CardDispatch) =>
  async (user: string, notebook: string): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestCardFromUserNotebook(user, notebook);

      dispatch({
        type: LOADED,
        payload: response.cards,
      });
    } catch (error) {}
  };

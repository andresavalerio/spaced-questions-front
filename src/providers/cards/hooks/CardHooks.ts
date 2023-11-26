import React from "react";
import { CardContext, CardDispatchContext } from "../CardProvider";
import { CardDispatch, CardsReducerTypes } from "../types";
import { requestCardFromUserNotebook } from "../api/CardAPI";

const useCardContext = () => React.useContext(CardContext);

const useCardDispatch = () => React.useContext(CardDispatchContext);

export const useCardProvider = () => {
  const dispatch = useCardDispatch();
  const state = useCardContext();

  if (!dispatch)
    throw new Error("Must be Defined in a Cards Provider Component");

  return {
    state,
    actions: {
      getCards: createGetCardsAction(dispatch),
    },
  };
};

const { LOADED, LOADING, ERROR } = CardsReducerTypes;

const createGetCardsAction =
  (dispatch: CardDispatch) =>
  async (user: string, notebookId: string): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestCardFromUserNotebook(user, notebookId);

      dispatch({ type: LOADED, payload: response });
    } catch (error) {
      dispatch({ type: ERROR });
      throw error;
    }
  };

import React from "react";
import { CardContext, CardDispatchContext } from "../CardProvider";
import { CardDispatch, CardState, CardsReducerTypes } from "../types";
import { requestCardFromUserNotebook } from "../api/CardAPI";

const useCardContext = () => React.useContext(CardContext);

const useCardDispatch = () => React.useContext(CardDispatchContext);

export const useCardProvider = () => {
  const dispatch = useCardDispatch();
  const state = useCardContext();

  console.log(`state`, state);
  

  if (!dispatch)
    throw new Error("Must be Defined in a Cards Provider Component");

  return {
    state,
    actions: {
      getCards: createGetCardsAction(state, dispatch),
    },
  };
};

const { CREATE, LOADED, LOADING, ERROR } = CardsReducerTypes;

 const createGetCardsAction =
  (state: CardState, dispatch: CardDispatch) =>
  async (user: string, notebook: string): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestCardFromUserNotebook(user, notebook);

      console.log(`response`,response);
      
      dispatch({
        type: LOADED,
        payload: response.cards,
      });

      console.log(response.cards)
    } catch (error) {
      dispatch({ type: ERROR });
      throw error;
    }
  };

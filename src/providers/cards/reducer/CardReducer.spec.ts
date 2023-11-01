import { CardState, CardsReducer, CardsReducerTypes } from "../types";
import { cardsReducer } from "./UserReduce";

describe("", () => {
  describe("Cards Reducer Creation and transitions", () => {
    const initialState: CardState = { loading: false };

    it("reducers to be in a unloaded state", () => {
      expect(cardsReducer).toBeDefined();
    });

    it("reducer is create with no data values", () => {
      const action: CardsReducer = {
        type: CardsReducerTypes.CREATE,
        payload: undefined,
      };

      const newState = cardsReducer(initialState, action);

      expect(newState).toHaveProperty("loading", false);
      expect(newState).not.toHaveProperty("data");
    });

    it("reducer is create and update state", () => {
      const action: CardsReducer = {
        type: CardsReducerTypes.CREATE,
        payload: undefined,
      };

      const loadingAction: CardsReducer = {
        type: CardsReducerTypes.LOADING,
        payload: undefined,
      };

      let states = cardsReducer(initialState, action);
      states = cardsReducer(states, loadingAction);

      expect(states).toHaveProperty("loading", true);
      expect(states).not.toHaveProperty("data");
    });

    it("reducer is create and update state to loaded", () => {
      const action: CardsReducer = {
        type: CardsReducerTypes.CREATE,
        payload: undefined,
      };

      const loadingAction: CardsReducer = {
        type: CardsReducerTypes.LOADING,
        payload: undefined,
      };

      const loadedAction: CardsReducer = {
        type: CardsReducerTypes.LOADED,
        payload: [],
      };

      let states = cardsReducer(initialState, action);
      states = cardsReducer(states, loadingAction);
      states = cardsReducer(states, loadedAction);

      expect(states).toHaveProperty("loading", false);
      expect(states).toHaveProperty("data", []);
    });
  });
});

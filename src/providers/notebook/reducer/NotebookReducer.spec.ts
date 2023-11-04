import { Notebook } from "../types";
import { notebookReducer } from "./NotebookReducer";
import {
  NotebookReducer,
  NotebookReducerTypes,
  NotebookState,
} from "./reducerTypes";

const initialState: NotebookState = {
  loading: false,
};

describe("NotebookReducer", () => {
  it("reducer should be on initial state", () => {
    expect(initialState).toBeDefined();
    expect(initialState).toHaveProperty("loading", false);
    expect(initialState).not.toHaveProperty("data");
  });

  it("reducer should be getting data", () => {
    const action: NotebookReducer = {
      type: NotebookReducerTypes.LOADING,
      payload: undefined,
    };

    const newState = notebookReducer(initialState, action);

    expect(newState).not.toHaveProperty("data");
    expect(newState).toHaveProperty("loading", true);
  });

  it("reducer should have got the data", () => {

    const notebook = {
        id: 12,
        name: "ATDD",
        content: "book about aceptance tests"
    } as Notebook
    
    const action: NotebookReducer = {
      type: NotebookReducerTypes.LOADED,
      payload: notebook,
    };

    const newState = notebookReducer(initialState, action);

    expect(newState).toHaveProperty("data");
    expect(newState).toHaveProperty("data", notebook);
    expect(newState).toHaveProperty("loading", false);
  });
});

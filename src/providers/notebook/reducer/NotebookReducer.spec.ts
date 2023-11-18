import { Notebook } from "../types";
import { notebookReducer } from "./NotebookReducer";
import {
  NotebookReducers,
  NotebookReducerTypes,
  NotebookState,
} from "./reducerTypes";

const initialState: NotebookState = {
  loading: false,
};

describe("NotebookReducer", () => {
  beforeEach(() => {
    initialState.data = undefined;
    initialState.loading = false;
  });

  it("reducer should be on initial state", () => {
    expect(initialState).toBeDefined();
    expect(initialState).toHaveProperty("loading", false);
    expect(initialState.data).not.toBeDefined();
  });

  it("reducer should be waiting(LOADING) for data", () => {
    const action: NotebookReducers = {
      type: NotebookReducerTypes.LOADING,
      payload: undefined,
    };

    const newState = notebookReducer(initialState, action);

    expect(newState).toHaveProperty("loading", true);
    expect(newState.data).not.toBeDefined();
  });

  it("reducer should have got the data", () => {
    const notebook = {
      id: 12,
      name: "ATDD",
      content: "book about aceptance tests",
    } as Notebook;

    const action: NotebookReducers = {
      type: NotebookReducerTypes.LOAD,
      payload: [notebook],
    };

    const newState = notebookReducer(initialState, action);

    const newStatePayload = newState.data![0];

    expect(newState).toHaveProperty("loading", false);
    expect(newStatePayload).toBe(notebook);
  });

  it("reducer should get to an error state", () => {
    const action: NotebookReducers = {
      type: NotebookReducerTypes.ERROR,
      payload: undefined,
    };

    const newState = notebookReducer(initialState, action);

    expect(newState.data).toHaveLength(0);
    expect(newState).toHaveProperty("loading", false);
  });

  it("reducer should be on deleted state", () => {
    const loadedState = {
      loading: false,
      data: [{id: 12}, {id: 15}] as Notebook[],
    } as NotebookState;

    const action: NotebookReducers = {
      type: NotebookReducerTypes.DELETE,
      payload: 12,
    };

    const newState = notebookReducer(loadedState, action);

    expect(newState.data).toHaveLength(1);
    expect(newState.data![0]).toHaveProperty("id",15);
    expect(newState).toHaveProperty("loading", false);
  });
  
  it("reducer should be throw errow on Delete operation for empty data from previou state", () => {
    const action: NotebookReducers = {
      type: NotebookReducerTypes.DELETE,
      payload: 12,
    };

    expect(() => {notebookReducer(initialState, action);}).toThrowError("Empty List Of Notebooks")
    
  });
});

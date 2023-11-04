import { notebookReducer } from "./NotebookReducer";
import { NotebookReducer, NotebookReducerTypes, NotebookState } from "./reducerTypes";

const initialState: NotebookState = {
  loading: false,
};

describe("NotebookReducer", () => {

  it("reducer should be on initial state", () => {
    expect(initialState).toBeDefined();
    expect(initialState).toHaveProperty("loading", false);
    expect(initialState).not.toHaveProperty("data")
  });

  it("reducer should be gettin data", () => {
    const action:NotebookReducer = {
        type: NotebookReducerTypes.LOADING,
        payload: undefined
    }

    const newState = notebookReducer(initialState, action);

    expect(newState).not.toHaveProperty('payload')
    expect(newState).not.toHaveProperty('type', NotebookReducerTypes.LOADING)

  })

});

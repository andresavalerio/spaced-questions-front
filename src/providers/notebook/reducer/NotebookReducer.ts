import {
  NotebookReducerTypes,
  NotebookReducers,
  NotebookState,
} from "../types";

export const notebookReducer = (
  state: NotebookState,
  action: NotebookReducers
) => {
  if (action.type === NotebookReducerTypes.LOADING)
    return loadingNotebookReducer(state);

  // if (action.type === NotebookReducerTypes.DELETE) return { loading: true };

  return state;
};

const loadingNotebookReducer = (state: NotebookState): NotebookState => {
  return { ...state, loading: true };
};

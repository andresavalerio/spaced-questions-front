import { NotebookReducer, NotebookReducerTypes, NotebookState } from "./reducerTypes";

export const notebookReducer = (
  state: NotebookState,
  action: NotebookReducer
) => {

  switch(action.type){
    case NotebookReducerTypes.LOADING:
      return loadingNotebookReducer(state);
    default:
      return state
  }
  // if (action.type === NotebookReducerTypes.DELETE) return { loading: true };

  return state;
};

const loadingNotebookReducer = (state: NotebookState): NotebookState => {
  return { ...state, loading: true };
};

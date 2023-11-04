import { NotebookReducer, NotebookReducerTypes, NotebookState } from "./reducerTypes";

export const notebookReducer = (
  state: NotebookState,
  action: NotebookReducer
) => {

  switch(action.type){
    case NotebookReducerTypes.LOADING:
      return loadingNotebookReducer(state);
    case NotebookReducerTypes.LOADED:
      return loadedNotebookReducer(action);
    default:
      return state
  }
  // if (action.type === NotebookReducerTypes.DELETE) return { loading: true };

  return state;
};

const loadingNotebookReducer = (state: NotebookState): NotebookState => {
  return { ...state, loading: true };
};

const loadedNotebookReducer = (state: NotebookReducer): NotebookState => {
  return { loading: false, data: state.payload }
}

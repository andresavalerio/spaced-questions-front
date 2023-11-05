import {
  NotebookReducer,
  NotebookReducerTypes,
  NotebookState,
} from "./reducerTypes";

export const notebookReducer = (
  state: NotebookState,
  action: NotebookReducer
) => {
  switch (action.type) {
    case NotebookReducerTypes.LOADING:
      return loadingNotebookReducer(state);
    case NotebookReducerTypes.LOADED:
      return loadedNotebookReducer(action);
    case NotebookReducerTypes.ERROR:
      return errorNotebookReducer();
    case NotebookReducerTypes.DELETE:
      return deleteNotebookReducer();
    default:
      return state;
  }
  // if (action.type === NotebookReducerTypes.DELETE) return { loading: true };
};

const loadingNotebookReducer = (state: NotebookState): NotebookState => {
  return { ...state, loading: true };
};

const loadedNotebookReducer = (state: NotebookReducer): NotebookState => {
  return { loading: false, data: state.payload };
};

const errorNotebookReducer = (): NotebookState => {
  return { loading: false, data: undefined };
};

const deleteNotebookReducer = (): NotebookState => {
  return { loading: false, data: undefined };
};

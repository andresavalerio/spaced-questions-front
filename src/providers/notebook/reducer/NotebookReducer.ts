import {
  NotebookReducerTypes,
  NotebookState,
} from "./reducerTypes";
import {
  NotebookReducers
} from "../reducer/reducerTypes.ts";


export const notebookReducer = (
  state: NotebookState,
  action: NotebookReducers
) => {
  switch (action.type) {

    case NotebookReducerTypes.LOADING:
      return loadingNotebookReducer(state);

    case NotebookReducerTypes.DEFAULT:
      return loadedNotebookReducer(action);

    case NotebookReducerTypes.ERROR:
      return errorNotebookReducer();

    case NotebookReducerTypes.DELETE:
      return deleteNotebookReducer();

    default:
      return state;
  }
};

const loadingNotebookReducer = (state: NotebookState): NotebookState => {
  return { ...state, loading: true };
};

const loadedNotebookReducer = (state: NotebookReducers): NotebookState => {
  return { loading: false, data: state.payload };
};

const errorNotebookReducer = (): NotebookState => {
  return { loading: false, data: undefined };
};

const deleteNotebookReducer = (): NotebookState => {
  return { loading: false, data: undefined };
};

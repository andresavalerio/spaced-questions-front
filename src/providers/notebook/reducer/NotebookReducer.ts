import {
  NotebookReducerTypes,
  NotebookState,
} from "./reducerTypes";
import {
  NotebookReducers
} from "../reducer/reducerTypes.ts";
import { Notebook } from "../types.ts";


export const notebookReducer = (
  state: NotebookState,
  action: NotebookReducers
) => {
  switch (action.type) {

    case NotebookReducerTypes.LOADING:
      return loadingNotebookReducer(state);

    case NotebookReducerTypes.DEFAULT:
      return defaultNotebookReducer(action.payload);

    case NotebookReducerTypes.ERROR:
      return errorNotebookReducer();

    case NotebookReducerTypes.DELETE:
      return deleteNotebookReducer();

    case NotebookReducerTypes.CREATE:
      return createNotebookReducer(action);

    case NotebookReducerTypes.RENAME:
      return renameNotebookReducer(action);
    
    case NotebookReducerTypes.UPDATE:
      return notebookUpdateReducer(action.payload);

    default:
      return state;
  }
};

const notebookUpdateReducer = (notebook: Notebook[]): NotebookState => {
  return {loading: false, data: notebook};
}

const loadingNotebookReducer = (state: NotebookState): NotebookState => {
  return { ...state, loading: true };
};

const defaultNotebookReducer = (notebooks: Notebook[]): NotebookState => {
  return { loading: false, data: notebooks };
};

const errorNotebookReducer = (): NotebookState => {
  return { loading: false, data: undefined };
};

const deleteNotebookReducer = (): NotebookState => {
  return { loading: false, data: undefined };
};

const createNotebookReducer = (state: NotebookReducers): NotebookState => {
  return { loading: false, data: state.payload };
};

const renameNotebookReducer= (state:NotebookReducers): NotebookState => {
  return {loading: false, data: state.payload};
}
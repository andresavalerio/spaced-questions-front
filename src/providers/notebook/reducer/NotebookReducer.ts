import { NotebookReducerTypes, NotebookState } from "./reducerTypes";
import { NotebookReducers } from "../reducer/reducerTypes.ts";
import { Notebook } from "../types.ts";

export const notebookReducer = (
  state: NotebookState,
  action: NotebookReducers
) => {
  switch (action.type) {
    case NotebookReducerTypes.LOADING:
      return loadingNotebookReducer(state);

    case NotebookReducerTypes.LOAD:
      return loadNotebookReducer(action.payload);

    case NotebookReducerTypes.ERROR:
      return errorNotebookReducer();

    case NotebookReducerTypes.DELETE:
      return deleteNotebookReducer(state.data, action.payload);

    case NotebookReducerTypes.CREATE:
      return createNotebookReducer(state.data, action.payload);

    case NotebookReducerTypes.UPDATE:
      return updateNotebooksReducer(state.data, action.payload);

    default:
      return state;
  }
};

const updateNotebooksReducer = (
  oldNotebooks: Notebook[],
  notebook: Notebook[]
): NotebookState => {
  return {
    loading: false,
    data: oldNotebooks.map((oldNotebook) => {
      const notebookFound = notebook.find(({ id }) => oldNotebook.id === id);

      if (!notebookFound) return oldNotebook;

      return notebookFound;
    }),
  };
};

const loadingNotebookReducer = (state: NotebookState): NotebookState => {
  return { ...state, loading: true };
};

const loadNotebookReducer = (notebooks: Notebook[]): NotebookState => {
  return { loading: false, data: notebooks };
};

const errorNotebookReducer = (): NotebookState => {
  return { loading: false, data: [] };
};

const deleteNotebookReducer = (
  oldNotebooks: Notebook[],
  id: number
): NotebookState => {
  if (!oldNotebooks) throw Error("Empty List Of Notebooks");
  return {
    loading: false,
    data: oldNotebooks.filter((notebook) => {
      const sameNotebook = notebook.id === id;

      return !sameNotebook;
    }),
  };
};

const createNotebookReducer = (
  oldNotebooks: Notebook[],
  newNotebook: Notebook[]
): NotebookState => {
  return { loading: false, data: [...oldNotebooks, ...newNotebook] };
};

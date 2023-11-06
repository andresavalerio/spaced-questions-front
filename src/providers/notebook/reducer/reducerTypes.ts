import { Notebook } from "../types";

export type NotebookState = {
  loading: boolean;
  data?: Notebook;
};

export enum NotebookReducerTypes {
  LOADING = "LOADING",
  LOADED = "LOADED",
  DELETE = "DELETED",
  ERROR = "ERROR",
}

type NotebookRequestingNotebook = {
  type: NotebookReducerTypes.LOADING;
  payload?: undefined;
};

type NotebookLoaded = {
  type: NotebookReducerTypes.LOADED;
  payload: Notebook;
};

type NotebookError = {
  type: NotebookReducerTypes.ERROR;
  payload?: undefined;
};

type NotebookDelete = {
  type: NotebookReducerTypes.DELETE,
  payload?: undefined
}

export type NotebookReducers =
  | NotebookRequestingNotebook
  | NotebookLoaded
  | NotebookError
  | NotebookDelete;

  export type NotebookDispatch = React.Dispatch<NotebookReducers>;


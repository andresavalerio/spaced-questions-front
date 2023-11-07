import { Notebook } from "../types";

export type NotebookState = {
  loading: boolean;
  data?: Notebook[];
};

export enum NotebookReducerTypes {
  LOADING = "LOADING",
  LOAD = "LOAD",
  DELETE = "DELETED",
  ERROR = "ERROR",
}

type NotebookRequestingNotebook = {
  type: NotebookReducerTypes.LOADING;
  payload?: undefined;
};

type NotebookLoaded = {
  type: NotebookReducerTypes.LOAD;
  payload: Notebook[];
};

type NotebookError = {
  type: NotebookReducerTypes.ERROR;
  payload?: undefined;
};

type NotebookDelete = {
  type: NotebookReducerTypes.DELETE,
  payload?: Notebook[]; 
}

export type NotebookReducers =
  | NotebookRequestingNotebook
  | NotebookLoaded
  | NotebookError
  | NotebookDelete;

export type NotebookDispatch = React.Dispatch<NotebookReducers>;


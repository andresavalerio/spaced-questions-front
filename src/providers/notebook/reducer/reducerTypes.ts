import { Notebook } from "../types";

export type NotebookState = {
  loading: boolean;
  data?: Notebook[];
};

export enum NotebookReducerTypes {
  LOADING = "LOADING",
  DEFAULT = "DEFAULT",
  DELETE = "DELETED",
  ERROR = "ERROR",
}

type NotebookRequestingNotebook = {
  type: NotebookReducerTypes.LOADING;
  payload?: undefined;
};

type NotebookDefault = {
  type: NotebookReducerTypes.DEFAULT;
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
  | NotebookDefault
  | NotebookError
  | NotebookDelete;

export type NotebookDispatch = React.Dispatch<NotebookReducers>;


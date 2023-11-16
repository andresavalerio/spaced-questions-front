import { Notebook } from "../types";

export type NotebookState = {
  loading: boolean;
  data?: Notebook[];
};

export enum NotebookReducerTypes {
  LOADING = "LOADING",
  DEFAULT = "DEFAULT",
  CREATE = "CREATE",
  DELETE = "DELETED",
  ERROR = "ERROR",
  RENAME = "RENAME",
  UPDATE = "UPDATE",
}

type NotebookRequestingNotebook = {
  type: NotebookReducerTypes.LOADING;
  payload?: undefined;
};

type NotebookDefault = {
  type: NotebookReducerTypes.DEFAULT;
  payload: Notebook[];
};

type NotebookCreate = {
  type: NotebookReducerTypes.CREATE;
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

type NotebookRename = {
  type: NotebookReducerTypes.RENAME;
  payload?: Notebook[];
};

type NotebookUpdate = {
  type: NotebookReducerTypes.UPDATE;
  payload?: Notebook[];
}

export type NotebookReducers =
  | NotebookRequestingNotebook
  | NotebookDefault
  | NotebookCreate
  | NotebookError
  | NotebookDelete
  | NotebookRename
  | NotebookUpdate;

export type NotebookDispatch = React.Dispatch<NotebookReducers>;


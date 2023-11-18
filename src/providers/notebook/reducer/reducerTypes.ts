import { Notebook } from "../types";

export type NotebookState = {
  loading: boolean;
  data: Notebook[];
};

export enum NotebookReducerTypes {
  LOADING = "LOADING",
  LOAD = "LOAD",
  CREATE = "CREATE",
  DELETE = "DELETED",
  ERROR = "ERROR",
  UPDATE = "UPDATE",
}

type NotebookLoading = {
  type: NotebookReducerTypes.LOADING;
  payload?: undefined;
};

type NotebookLoad = {
  type: NotebookReducerTypes.LOAD;
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
  type: NotebookReducerTypes.DELETE;
  payload: number;
};

type NotebookUpdate = {
  type: NotebookReducerTypes.UPDATE;
  payload: Notebook[];
};

export type NotebookReducers =
  | NotebookLoading
  | NotebookLoad
  | NotebookCreate
  | NotebookError
  | NotebookDelete
  | NotebookUpdate;

export type NotebookDispatch = React.Dispatch<NotebookReducers>;

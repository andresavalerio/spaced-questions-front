import { Notebook } from "../types";

export type NotebookState = {
  loading: boolean;
  data?: Notebook;
};

export enum NotebookReducerTypes {
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR",
}

export type NotebookReducer =
  | NotebookRequestingNotebook
  | NotebookLoaded
  | NotebookError;

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

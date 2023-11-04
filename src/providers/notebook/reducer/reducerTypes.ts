import { Notebook } from "../types";

export type NotebookState = {
  loading: boolean;
  data? : Notebook 
};

export enum NotebookReducerTypes {
  LOADING = "LOADING",
  LOADED = "LOADED",
}

export type NotebookReducer = NotebookRequestingNotebook | NotebookLoaded;

type NotebookRequestingNotebook = {
  type: NotebookReducerTypes.LOADING;
  payload?: undefined;
};

type NotebookLoaded = {
  type: NotebookReducerTypes.LOADED;
  payload: Notebook;
};

export type NotebookState = {
  loading: boolean;
};

export enum NotebookReducerTypes {
  LOADING = "LOADING",
}

type NotebookLoadingReducer = {
  type: NotebookReducerTypes.LOADING;
  payload?: undefined;
};

export type NotebookReducers = NotebookLoadingReducer;

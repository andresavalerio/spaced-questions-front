export type NotebookState = {
  loading: boolean;
};

export enum NotebookReducerTypes {
  LOADING = "LOADING",
  // DELETE = "DELETE",
}

type NotebookLoadingReducer = {
  type: NotebookReducerTypes.LOADING;
  payload?: undefined;
};

// type DeleteNotebookReducer = {
//   type: NotebookReducerTypes.DELETE;
//   payload?: {
//     id: string;
//   };
// };

export type NotebookReducers =
  NotebookLoadingReducer /*|DeleteNotebookReducer*/;

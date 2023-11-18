import React from "react";
import { NotebookContext, NotebookDispatchContext } from "../NotebookProvider";
import {
  NotebookDispatch,
  NotebookReducerTypes,
  NotebookState,
} from "../reducer/reducerTypes";
import {
  requestDeleteNotebook,
  requestNotebookById,
  requestNotebooksByOwner,
  requestCreateNotebook,
  requestRenameNotebook,
  requestNotebookUpdate,
} from "../api/NotebookAPI";
import { Notebook } from "../types";

const {
  LOADING,
  LOAD: DEFAULT,
  CREATE,
  DELETE,
  ERROR,
  RENAME,
  UPDATE,
} = NotebookReducerTypes;

const useNotebookContext = () => React.useContext(NotebookContext);

const useNotebookDispatch = () => React.useContext(NotebookDispatchContext);

export const useNotebookProvider = () => {
  const dispatch = useNotebookDispatch();
  const state = useNotebookContext();

  if (!dispatch)
    throw new Error("Must be Defined in a Notebook Provider Component");

  return {
    state,
    actions: {
      getNotebook: getNotebookAction(state, dispatch),
      createNotebook: createCreateNotebookAction(state, dispatch),
      deleteNotebook: createDeleteNotebookAction(state, dispatch),
      defaultNotebooks: createDefaultNotebookAction(state, dispatch),
      renameNotebook: createRenameNotebookAction(state, dispatch),
      updateNotebook: createUpdateNotebookAction(state, dispatch),
    },
  };
};

export const createDefaultNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (owner: string) => {
    const response = await requestNotebooksByOwner(owner);

    dispatch({
      type: DEFAULT,
      payload: response.notebook,
    });
  };

export const getNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (owner: string, notebook: string): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestNotebookById(owner, notebook);

      dispatch({
        type: DEFAULT,
        payload: response.notebook,
      });
    } catch (error) {
      dispatch({ type: ERROR });
      console.error(error);
    }
  };

export const createCreateNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (notebook: Notebook): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestCreateNotebook(notebook);

      dispatch({
        type: CREATE,
        payload: response.notebook,
      });
    } catch (error) {
      dispatch({ type: ERROR });
      console.error(error);
    }
  };

export const createRenameNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (
    owner: string,
    notebookName: string,
    newName: string
  ): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestRenameNotebook(
        owner,
        notebookName,
        newName
      );

      dispatch({
        type: RENAME,
        payload: response.notebook,
      });
    } catch (error) {
      dispatch({ type: ERROR });
      console.error(error);
    }
  };

export const createDeleteNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (owner: string, notebook: string): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      await requestDeleteNotebook(owner, notebook);

      dispatch({ type: DELETE, payload: undefined });
    } catch (error) {
      dispatch({ type: ERROR });
      console.log(error);
    }
  };

export const createUpdateNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (owner: string, notebook: string): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestNotebookUpdate(owner, notebook);

      dispatch({ type: UPDATE, payload: response.notebook });
    } catch (error) {
      dispatch({ type: ERROR });
      console.log(error);
    }
  };

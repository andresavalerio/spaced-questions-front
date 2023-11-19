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
  requestNotebookUpdate,
} from "../api/NotebookAPI";
import { Notebook, UpdateNotebookDTO } from "../types";

const { LOADING, LOAD, CREATE, DELETE, ERROR, UPDATE } = NotebookReducerTypes;

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
      getNotebookById: createGetNotebookByIdAction(state, dispatch),
      createNotebook: createCreateNotebookAction(state, dispatch),
      deleteNotebookById: createDeleteNotebookAction(state, dispatch),
      loadNotebooks: createLoadNotebookAction(state, dispatch),
      updateNotebook: createUpdateNotebookAction(state, dispatch),
    },
  };
};

export const createLoadNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (owner: string) => {
    dispatch({ type: LOADING });

    const response = await requestNotebooksByOwner(owner);

    dispatch({ type: LOAD, payload: response.notebook });
  };

export const createGetNotebookByIdAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (owner: string, id: number): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestNotebookById(owner, id);

      dispatch({ type: LOAD, payload: response.notebook });
    } catch (error) {
      console.error(error);

      dispatch({ type: ERROR });
    }
  };

export const createCreateNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (name: string, owner: string): Promise<Notebook[] | undefined> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestCreateNotebook(name, owner);

      dispatch({ type: CREATE, payload: response.notebook });

      return response.notebook;
    } catch (error) {
      console.error(error);

      dispatch({ type: ERROR });
    }
  };

export const createDeleteNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (owner: string, id: number): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      await requestDeleteNotebook(owner, id);

      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR });
    }
  };

export const createUpdateNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (owner: string, id: number, data: UpdateNotebookDTO): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestNotebookUpdate(owner, id, data);

      dispatch({ type: UPDATE, payload: response.notebook });
    } catch (error) {
      dispatch({ type: ERROR });
      console.log(error);
    }
  };

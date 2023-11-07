import React from "react";
import { NotebookContext, NotebookDispatchContext } from "../NotebookProvider";
import {
  NotebookDispatch,
  NotebookReducerTypes,
  NotebookState,
} from "../reducer/reducerTypes";
import {
  requestDeleteNotebook,
  requestNotebookByName,
} from "../api/NotebookAPI";

const { LOADED, LOADING, DELETE, ERROR } = NotebookReducerTypes;

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
      removeNotebook: removeNotebookAction(state, dispatch),
    },
  };
};

export const createLoadingNotebookAction = (
  state: NotebookState,
  dispatch: NotebookDispatch
) => {
  //Ver se já ta carregando
  if (state.loading) {
    //Se não estiver
    dispatch({ type: LOADING });
  }
  //Se estiver
  //Null, ignora a request
};

export const getNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (owner: string, notebook: string): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestNotebookByName(owner, notebook);

      dispatch({
        type: LOADED,
        payload: response.notebooks,
      });
    } catch (error) {
      dispatch({ type: ERROR });
      console.error(error);
    }
  };

export const removeNotebookAction =
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

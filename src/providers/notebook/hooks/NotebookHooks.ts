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
  requestUserNotebooks, 
} from "../api/NotebookAPI";
import { notebookReducer } from "../reducer/NotebookReducer";

/*
LOADING - Não sei
LOAD - Tbm n sei
||  OK  ||DELETE - Request para chamar a função do API de deleção de notebook (Não deve ser acessivel caso exista apenas 1 notebook)
ERROR - Cancela uma request que não tenha tido o comportamento adequado
*/ 
const { LOADING, LOAD, DELETE, ERROR } = NotebookReducerTypes;
//Talvez criar hooks para a criação e carregamento dos cards?

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
      deleteNotebook: createDeleteNotebookAction(state, dispatch),
      loadNotebooks: createLoadNotebookAction(state, dispatch),
    },
  };
};

/*
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
*/

////////////////////////////////////////////////////    LEO - INICIO  //////////////////////////////////////////////////// 
export const createLoadNotebookAction =
(state: NotebookState, dispatch: NotebookDispatch) => async (owner:string) => {

  const response =  await requestUserNotebooks(owner); //Request para chamar notebooks

  dispatch({ type: NotebookReducerTypes.DELETE, payload: response.notebooks }); //já nem sei mais o que tá despachando
}

////////////////////////////////////////////////////    LEO - FIM    ////////////////////////////////////////////////////

export const getNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
  async (owner: string, notebook: string): Promise<void> => {
    try {
      dispatch({ type: LOADING });

      const response = await requestNotebookByName(owner, notebook);

      dispatch({
        type: LOAD,
        payload: response.notebooks,
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

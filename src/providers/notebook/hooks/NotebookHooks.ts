import React from "react";
import { NotebookContext, NotebookDispatchContext } from "../NotebookProvider";
import {

  NotebookDispatch,
  NotebookReducerTypes,
  NotebookState,

} from "../reducer/reducerTypes";

const { LOADED, LOADING, DELETE, ERROR } = NotebookReducerTypes;

const useNotebookContext = () => React.useContext(NotebookContext);

const useNotebookDispatch = () => React.useContext(NotebookDispatchContext);

export const useNotebookProvider = () => {
  const dispatch = useNotebookDispatch();
  const state = useNotebookContext();

  if (!dispatch)
    throw new Error("Must be Defined in a User Provider Component");

  return { state, actions: {} };
};

export const createLoadingNotebookAction =
  (state: NotebookState, dispatch: NotebookDispatch) =>
{
    //Ver se já ta carregando
    if(state.loading){

    //Se não estiver
    dispatch({ type: LOADING });
    }
    //Se estiver
    //Null, ignora a request
}





// export const createLoginUserAction =
//   (state: UserState, dispatch: UserDispatch) =>
//   async (login: string, password: string): Promise<void> => {
//     try {
//       if (isUserLogged(state)) {
//         throw new UserAlreadyLoggedError();
//       }

//       dispatch({ type: LOADING });

//       const response = await requestUserLogin(login, password);

//       if (!response) throw new Error();

//       localStorage.setItem("token", response.token);

//       dispatch({
//         type: LOGIN,
//         payload: response.user,
//       });
//     } catch (error) {
//       dispatch({ type: ERROR });
//       throw error;
//     }
//   };
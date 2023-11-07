import React from "react";
import { notebookReducer } from "./reducer/NotebookReducer";
import { NotebookReducer, NotebookState } from "./reducer/reducerTypes";

const initialState: NotebookState = { loading: false };

export const NotebookContext = React.createContext<NotebookState>(initialState);

export const NotebookDispatchContext =
  React.createContext<React.Dispatch<NotebookReducer> | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [notebookState, dispatch] = React.useReducer(
    notebookReducer,
    initialState
  );

  return (
    <NotebookContext.Provider value={notebookState}>
      <NotebookDispatchContext.Provider value={dispatch}>
        {children}
      </NotebookDispatchContext.Provider>
    </NotebookContext.Provider>
  );
}

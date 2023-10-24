import React from "react";
import { notebookReducer } from "./reducer/NotebookReducer";
import { NotebookReducers, NotebookState } from "./types";

const initialState: NotebookState = { loading: false };

export const NotebookContext = React.createContext<NotebookState>(initialState);

export const NotebookDispatchContext =
  React.createContext<React.Dispatch<NotebookReducers> | null>(null);

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
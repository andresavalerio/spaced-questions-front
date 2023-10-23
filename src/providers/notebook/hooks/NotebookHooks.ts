import React from "react";
import { NotebookContext, NotebookDispatchContext } from "../NotebookProvider";

const useNotebookContext = () => React.useContext(NotebookContext);

const useNotebookDispatch = () => React.useContext(NotebookDispatchContext);

export const useNotebookProvider = () => {
  const dispatch = useNotebookDispatch();
  const state = useNotebookContext();

  if (!dispatch)
    throw new Error("Must be Defined in a User Provider Component");

  return { state, actions: {} };
};

import { RequestBody, fetchAPI } from "helpers/fetch";
import { NotebookBadRequest, NotebookRequestError } from "../errors";
import { Notebook, NotebooksAPIResponse, NotebooksOwner } from "../types";
import { notebookReducer } from "../reducer/NotebookReducer";

export async function createNotebook(name: string, owner: string) {
  const requestBody: RequestBody = {
    method: "POST",
    body: JSON.stringify({ name, owner }),
  };

  const response = await fetchAPI("/notebooks", requestBody);

  if (response.status === 400) throw new NotebookBadRequest();

  if (response.status !== 201) throw new NotebookRequestError();

  return response.json();
}

export const requestUserNotebooks = async (owner: string) => {
  const response = await fetchAPI(`/notebooks/${owner}`);

  if (response.status !== 200) throw new Error();

  return response.json() as unknown as NotebooksAPIResponse;
};

export const requestCreateNotebook = async (newNotebook: Notebook) => {
  const requestBody: RequestBody = {
    method: "POST",
    body: JSON.stringify(newNotebook),
  };
  const response = await fetchAPI(`/notebooks`, requestBody);

  return response.json() as unknown as NotebooksAPIResponse;
};

export const requestDeleteNotebook = async (owner: string, name: string) => {
  const response = await fetchAPI(`/notebooks/${owner}/${name}`, {
    method: "DELETE",
  });

  return response.status;
};

export async function getNotebooksByOwner(owner: string) {
  const response = await fetchAPI(`/notebooks/${owner}`);

  if (response.status !== 200) throw new NotebookRequestError();

  return response.json();
}

export async function requestNotebookByName(owner: string, notebook: string) {
  const response = await fetchAPI(`/notebook/${owner}/${notebook}`);

  return response.json() as unknown as NotebooksAPIResponse;
}

export async function requestRenameNotebook(
  owner: string,
  notebookName: string,
  newName: string
) {
  const requestBody: RequestBody = {
    method: "PATCH",
    body: JSON.stringify({ newName }),
  };

  const response = await fetchAPI(`/notebook/${owner}/${notebookName}`, requestBody);

  if (response.status === 400) throw new NotebookBadRequest();

  if (response.status !== 200) throw new NotebookRequestError();

  return response.json();
}

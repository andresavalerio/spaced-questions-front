import { RequestBody, fetchAPI } from "helpers/fetch";
import { NotebookBadRequest, NotebookRequestError } from "../errors";
import { NotebooksOwner, NotebooksAPIResponse, CreateNotebookDTO, SpecificNotebook } from "../types";
import { json } from "react-router-dom";

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const requestUserNotebook = async (owner: string) => {
  const body: NotebooksOwner = { owner };

  const response = await fetchAPI(`/notebooks/${owner}`);

  if (response.status !== 200) throw new Error();

  return response.json() as unknown as NotebooksAPIResponse;
};

export const requestCreateNotebook = async (newNotebook: CreateNotebookDTO) => {
  const requestBody: RequestInit = {
    method: "POST",
    body: JSON.stringify(newNotebook),
  };
  const response = await fetchAPI(`/notebooks`, requestBody);
}

export const requestDeleteNotebook = async (owner: string) => {
  const body: NotebooksOwner = { owner };
  
  const response = await fetchAPI(`/notebooks/${owner}`, {
    method: "DELETE",
  });

  return response.json() as unknown as NotebooksAPIResponse;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getNotebooksByOwner(owner: string) {
  const response = await fetchAPI(`/notebooks/${owner}`);

  if (response.status !== 200) throw new NotebookRequestError();

  return response.json();
}

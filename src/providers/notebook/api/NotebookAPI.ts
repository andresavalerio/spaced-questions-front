import { RequestBody, fetchAPI } from "helpers/fetch";
import { NotebookBadRequest, NotebookRequestError } from "../errors";
import { NotebooksType, NotebooksAPIResponse, NotebookListType } from "../types";

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
  const body: NotebooksType = { owner };

  const response = await fetchAPI(`/notebooks/${owner}`);

  if (response.status !== 200) throw new Error();

  return response.json() as unknown as NotebooksAPIResponse;
};

export const requestCreateNotebook = async (owner: string, id: number) => {
  const body: NotebooksType = { owner };
  
  const response = await fetchAPI(`/notebooks/${owner}`);

  

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getNotebooksByOwner(owner: string) {
  const response = await fetchAPI(`/notebooks/${owner}`);

  if (response.status !== 200) throw new NotebookRequestError();

  return response.json();
}

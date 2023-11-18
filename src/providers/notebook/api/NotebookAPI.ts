import { RequestBody, fetchAPI } from "helpers/fetch";
import { NotebookBadRequest, NotebookRequestError } from "../errors";
import { NotebooksAPIResponse, UpdateNotebookDTO } from "../types";

export const requestNotebooksByOwner = async (owner: string) => {
  const response = await fetchAPI(`/notebooks/${owner}`);

  if (response.status !== 200) throw new Error();

  return response.json() as unknown as NotebooksAPIResponse;
};

export const requestCreateNotebook = async (name: string, owner: string) => {
  const requestBody: RequestBody = {
    method: "POST",
    body: JSON.stringify({ name, owner }),
  };

  const response = await fetchAPI("/notebooks", requestBody);

  if (response.status === 400) throw new NotebookBadRequest();

  if (response.status !== 201) throw new NotebookRequestError();

  return response.json();
};

export const requestDeleteNotebook = async (owner: string, id: number) => {
  const body = { method: "DELETE" };

  const response = await fetchAPI(`/notebooks/${owner}/${id}`, body);

  if (response.status !== 200) throw new Error();
};

export async function requestNotebookById(owner: string, id: number) {
  const response = await fetchAPI(`/notebook/${owner}/${id}`);

  return response.json() as unknown as NotebooksAPIResponse;
}

export async function requestNotebookUpdate(
  owner: string,
  id: number,
  updateData: UpdateNotebookDTO
) {
  const requestBody: RequestInit = {
    method: "PATCH",
    body: JSON.stringify(updateData),
  };

  const response = await fetchAPI(`/notebook/${owner}/${id}`, requestBody);

  if (response.status === 400) throw new NotebookBadRequest();

  if (response.status !== 200) throw new NotebookRequestError();

  return response.json() as unknown as NotebooksAPIResponse;
}

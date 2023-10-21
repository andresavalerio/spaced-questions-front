import { Axios, AxiosError } from "axios";

export const httpClient = new Axios({});

export const getResponseError = (error: unknown) => {
  const isRequestError = error instanceof AxiosError;

  if (!isRequestError) throw error;

  const response = error.response;

  if (!response) throw new Error("There is no Response");

  return response;
};

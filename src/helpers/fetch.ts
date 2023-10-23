import crossFetch from "cross-fetch";
import { buildEndpointPath } from "./api";

export const fetchAPI = (path: string, init?: RequestInit) => {
  const urlPath = buildEndpointPath(path);

  if (!init) init = {};

  if (!init.headers) init.headers = {};

  const token = localStorage.getItem("token");

  init.headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...init.headers,
  };

  return crossFetch(urlPath, init);
};

export type RequestBody = RequestInit;

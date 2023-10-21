import { serverBaseUrl } from "config";

export const fetchAPI = (path: string, init?: RequestInit) => {
  const urlPath = `${serverBaseUrl}${path}`;

  if (!init) init = {};

  if (!init.headers) init.headers = {};

  const token = localStorage.getItem("token");

  init.headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...init.headers,
  };

  return fetch(urlPath, init);
};

import { serverBaseUrl } from "config";

export const buildEndpointPath = (path: string) => `${serverBaseUrl}${path}`;

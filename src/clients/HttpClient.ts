import { Axios } from "axios";
import { serverBaseUrl } from "../config";

export const httpClient = new Axios({ baseURL: serverBaseUrl });

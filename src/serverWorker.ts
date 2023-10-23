import { setupWorker, type RequestHandler } from "msw";
import { notebookHandlers } from "providers/notebook/api/NotebookMockServer";
import { userHandlers } from "providers/user/api/UserMockServer";

const handlers: RequestHandler[] = [...userHandlers, ...notebookHandlers];

export const serverWorker = setupWorker(...handlers);

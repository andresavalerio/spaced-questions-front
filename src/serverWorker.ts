import { setupWorker, type RequestHandler } from "msw";
import { cardHandlers } from "providers/cards/api/CardMockServer";
import { notebookHandlers } from "providers/notebook/api/NotebookMockServer";
import { userHandlers } from "providers/user/api/UserMockServer";

const handlers: RequestHandler[] = [...userHandlers, ...notebookHandlers, ...cardHandlers];

export const serverWorker = setupWorker(...handlers);

import { setupWorker, type RequestHandler } from "msw";
import { userHandlers } from "providers/user/api/UserMockServer";

const handlers: RequestHandler[] = [...userHandlers];

export const serverWorker = setupWorker(...handlers);

import { buildEndpointPath } from "helpers/api";
import { RequestHandler, rest } from "msw";
import { NotebooksAPIResponse } from "../types";

const createNotebookEndpoint = buildEndpointPath("/notebooks");

const getNotebooksByOwnerEndpoint = buildEndpointPath("/notebooks/:owner");

const removeNotebookByOwnerEndpoint = buildEndpointPath("/notebooks/:owner/:name");

const createNotebookHandler = rest.post(
  createNotebookEndpoint,
  (req, res, ctx) => {
    return res(ctx.status(201));
  }
);

const createResponseNotebooks = (owner: string) => [
  { id: 1, name: "Caderno de Matematica", owner },
  { id: 2, name: "Caderno de Ciência", owner },
  { id: 3, name: "Caderno de Português", owner },
  { id: 4, name: "Caderno de Física", owner },
];

const getNotebookByOwnerHandler = rest.get(
  getNotebooksByOwnerEndpoint,
  async (req, res, ctx) => {
    const owner = req.params["owner"];

    if (!owner || typeof owner !== "string")
      return res(ctx.delay(), ctx.status(200), ctx.json([]));

    const notebooks = createResponseNotebooks(owner);

    return res(ctx.status(200), ctx.json({

      notebooks: createResponseNotebooks("LoginDeTeste")

    } as NotebooksAPIResponse));
  }
);

const removeNotebookByOwnerHandler = rest.delete(
  removeNotebookByOwnerEndpoint,
  async (req, res, ctx) => {
    const owner = req.params["owner"];
    const name = req.params["name"];

    const notebookExists = createResponseNotebooks(owner as string).find((notebook) => notebook.name === name)

    if (!!notebookExists) {
      return res(ctx.delay(), ctx.status(200));
    } else {
      return res(ctx.delay(), ctx.status(400));
    }
  }
)

export const notebookHandlers: RequestHandler[] = [
  createNotebookHandler,
  getNotebookByOwnerHandler,
  removeNotebookByOwnerHandler,
];

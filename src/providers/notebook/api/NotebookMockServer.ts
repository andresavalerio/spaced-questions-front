import { buildEndpointPath } from "helpers/api";
import { RequestHandler, rest } from "msw";
import { Notebook, NotebooksAPIResponse } from "../types";

const createNotebookEndpoint = buildEndpointPath("/notebooks");

const getNotebooksByOwnerEndpoint = buildEndpointPath("/notebooks/:owner");

const removeNotebookByOwnerEndpoint = buildEndpointPath(
  "/notebooks/:owner/:name"
);

const getNotebookByOwnerEndpoint = buildEndpointPath("/notebook/:owner/:name");

const repo: Notebook[] = [
  { id: 1, name: "Caderno de Matematica", owner: "pedro", content: "" },
  { id: 2, name: "Caderno de Ciência", owner: "pedro", content: "" },
  { id: 3, name: "Caderno de Português", owner: "pedro", content: "" },
  { id: 4, name: "Caderno de Física", owner: "pedro", content: "" },
];

const createNotebookHandler = rest.post(
  createNotebookEndpoint,
  async (req, res, ctx) => {
    const body = await req.json();

    const newNotebook = body as Notebook;

    repo.push(body);

    return res(
      ctx.status(201),
      ctx.json({ notebooks: [body] } as NotebooksAPIResponse)
    );
  }
);

const getNotebookByOwnerHandler = rest.get(
  getNotebooksByOwnerEndpoint,
  async (req, res, ctx) => {
    const owner = req.params["owner"];

    if (!owner || typeof owner !== "string")
      return res(ctx.delay(), ctx.status(200), ctx.json([]));

    const ownersNotebooks = repo.filter((notebook) => notebook.owner === owner);

    return res(
      ctx.status(200),
      ctx.json({
        notebooks: ownersNotebooks,
      } as NotebooksAPIResponse)
    );
  }
);

const removeNotebookByOwnerHandler = rest.delete(
  removeNotebookByOwnerEndpoint,
  async (req, res, ctx) => {
    const owner = req.params["owner"];
    const name = req.params["name"];

    const removedNotebook = removeNotebookFromRepository(owner, name);

    if (removedNotebook) {
      return res(ctx.delay(), ctx.status(200));
    } else {
      return res(ctx.delay(), ctx.status(400));
    }
  }
);

const getNotebookByOwnerAndNameHandler = rest.get(
  getNotebookByOwnerEndpoint,
  async (req, res, ctx) => {
    const owner = req.params["owner"];
    const name = req.params["name"];

    const notebook = repo.find(
      (notebook) => notebook.owner === owner && notebook.name === name
    );

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({ notebooks: [notebook] } as NotebooksAPIResponse)
    );
  }
);

export const notebookHandlers: RequestHandler[] = [
  createNotebookHandler,
  getNotebookByOwnerHandler,
  removeNotebookByOwnerHandler,
  getNotebookByOwnerAndNameHandler,
];
function removeNotebookFromRepository(
  owner: string | readonly string[],
  name: string | readonly string[]
) {
  const notebookIndex = repo.findIndex(
    (notebook) => notebook.owner === owner && notebook.name === name
  );
  const removedNotebook = repo.splice(notebookIndex, 1);
  return removedNotebook;
}

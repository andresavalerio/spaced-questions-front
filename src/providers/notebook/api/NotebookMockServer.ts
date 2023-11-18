import { buildEndpointPath } from "helpers/api";
import { RequestHandler, rest } from "msw";
import { Notebook, NotebooksAPIResponse } from "../types";

const createNotebookEndpoint = buildEndpointPath("/notebooks");

const getNotebooksByOwnerEndpoint = buildEndpointPath("/notebooks/:owner");

const removeNotebookByOwnerEndpoint = buildEndpointPath(
  "/notebooks/:owner/:id"
);

const getNotebookByOwnerEndpoint = buildEndpointPath("/notebook/:owner/:id");

const updateNotebookEndpoint = buildEndpointPath("/notebook/:owner/:id");

const repository: Notebook[] = [
  { id: 1, name: "Caderno de Matematica", owner: "pedro", content: "" },
  { id: 2, name: "Caderno de Ciência", owner: "pedro", content: "" },
  { id: 3, name: "Caderno de Português", owner: "pedro", content: "" },
  {
    id: 4,
    name: "Caderno de Física",
    owner: "pedro",
    content: "equações de Maxuel",
  },
];

const idGenerator: { nextGeneratedId: number; generateId: () => number } = {
  generateId: () => idGenerator.nextGeneratedId++,
  nextGeneratedId: 5,
};

const createNotebookHandler = rest.post(
  createNotebookEndpoint,
  async (req, res, ctx) => {
    const body = await req.json();

    const newNotebook = body as Notebook;

    newNotebook.id = idGenerator.generateId();

    repository.push(newNotebook);

    return res(
      ctx.status(201),
      ctx.json({ notebook: [body] } as NotebooksAPIResponse)
    );
  }
);

const getNotebookByOwnerHandler = rest.get(
  getNotebooksByOwnerEndpoint,
  async (req, res, ctx) => {
    const owner = req.params["owner"];

    if (!owner || typeof owner !== "string")
      return res(ctx.delay(), ctx.status(200), ctx.json([]));

    const isNobody = !owner;

    return res(
      ctx.status(200),
      ctx.json({ notebook: isNobody ? [] : repository } as NotebooksAPIResponse)
    );
  }
);

const removeNotebookByOwnerHandler = rest.delete(
  removeNotebookByOwnerEndpoint,
  async (req, res, ctx) => {
    const { owner, id } = req.params as { owner: string; id: string };

    const removedNotebook = removeNotebookFromRepository(owner, Number(id));

    if (removedNotebook) {
      return res(ctx.delay(), ctx.status(200));
    } else {
      return res(ctx.delay(), ctx.status(400));
    }
  }
);

const findNotebookById = (id: number) => (notebook: Notebook) => {
  return notebook.id === Number(id);
};

const getNotebookByOwnerAndIdHandler = rest.get(
  getNotebookByOwnerEndpoint,
  async (req, res, ctx) => {
    const owner = req.params["owner"] as string;
    const id = req.params["id"];

    if (!owner) return res(ctx.delay(), ctx.status(400));

    const notebook = repository.find(findNotebookById(Number(id)));

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({ notebook: [notebook] } as NotebooksAPIResponse)
    );
  }
);

const updateNotebookHandler = rest.patch(
  updateNotebookEndpoint,
  async (req, res, ctx) => {
    const owner = req.params["owner"] as string;

    if (!owner) return res(ctx.delay(), ctx.status(400));

    const id = req.params["id"];

    const notebookIndex = repository.findIndex(findNotebookById(Number(id)));

    const notebookFound = notebookIndex >= 0;

    if (!notebookFound) return res(ctx.delay(), ctx.status(400));

    const body = await req.json();

    if (body.newName) repository[notebookIndex].name = body.newName;

    if (typeof body?.newContent === "string")
      repository[notebookIndex].content = body.newContent;

    const notebooks = [repository[notebookIndex]];

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({ notebook: notebooks } as NotebooksAPIResponse)
    );
  }
);

export const notebookHandlers: RequestHandler[] = [
  createNotebookHandler,
  getNotebookByOwnerHandler,
  removeNotebookByOwnerHandler,
  getNotebookByOwnerAndIdHandler,
  updateNotebookHandler,
];

const findIndexById = (id: number) => (notebook: Notebook) => {
  const sameId = notebook.id === id;

  return sameId;
};

function removeNotebookFromRepository(owner: string, id: number) {
  const notebookIndex = repository.findIndex(findIndexById(id));

  const removedNotebook = repository.splice(notebookIndex, 1);

  return removedNotebook;
}

export const resetMockServer = () => {
  repository.splice(
    0,
    repository.length,
    ...[
      { id: 1, name: "Caderno de Matematica", owner: "pedro", content: "" },
      { id: 2, name: "Caderno de Ciência", owner: "pedro", content: "" },
      { id: 3, name: "Caderno de Português", owner: "pedro", content: "" },
      {
        id: 4,
        name: "Caderno de Física",
        owner: "pedro",
        content: "equações de Maxuel",
      },
    ]
  );
};

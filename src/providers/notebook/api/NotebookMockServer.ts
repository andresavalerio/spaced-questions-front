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

    const ownerNotebooks = repository.filter(
      (notebook) => notebook.owner === owner
    );

    return res(
      ctx.status(200),
      ctx.json({ notebook: ownerNotebooks } as NotebooksAPIResponse)
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

const findNotebookByOwnerAndId =
  (owner: string, id: number) => (notebook: Notebook) => {
    return notebook.owner === owner && notebook.id === Number(id);
  };

const getNotebookByOwnerAndIdHandler = rest.get(
  getNotebookByOwnerEndpoint,
  async (req, res, ctx) => {
    const owner = req.params["owner"] as string;
    const id = req.params["id"];

    const notebook = repository.find(
      findNotebookByOwnerAndId(owner, Number(id))
    );

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
    const { owner, id } = req.params as { owner: string; id: string };

    const body = await req.json();

    const notebookIndex = repository.findIndex(
      findNotebookByOwnerAndId(owner, Number(id))
    );

    const notebookFound = notebookIndex >= 0;

    const alterName = !!body.newName && body.newName != '';

    const alterContent = body.newContent;
    
    if (notebookFound && alterName) repository[notebookIndex].name = body.newName;

    if (notebookFound && alterContent) repository[notebookIndex].content = body.newContent;

    const notebooks = notebookFound ? [repository[notebookIndex]] : [];

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

const findIndexByOwnerAndId =
  (owner: string, id: number) => (notebook: Notebook) => {
    const sameOwner = notebook.owner === owner;
    const sameId = notebook.id === id;

    return sameOwner && sameId;
  };

function removeNotebookFromRepository(owner: string, id: number) {
  const notebookIndex = repository.findIndex(findIndexByOwnerAndId(owner, id));

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

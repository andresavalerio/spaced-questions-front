export type Notebook = {
  id: number;
  name: string;
  owner?: string;
  content: string;
};

export type NotebookState = {
  loading: boolean;
};

export type NotebooksOwner = {
  owner: string;
};

export type NotebookListType = {
  owner: string;
  id: number;
};

export type NotebooksAPIResponse = {
  notebooks: Notebook[];
};

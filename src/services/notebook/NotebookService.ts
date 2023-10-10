import axios from "axios";

export type Notebook = {
  name: string;
  username: string;
  activate: boolean;
};

export interface INotebookServiceProvider {
  getNotebooks(): Promise<Notebook[]>;
}

export class NotebookServiceProvider implements INotebookServiceProvider {
  async getNotebooks(): Promise<Notebook[]> {
    const response = await axios.get("url");

    return response.data as Notebook[];
  }
}

export class NotebookService {
  private provider: INotebookServiceProvider;

  constructor(provider: INotebookServiceProvider) {
    this.provider = provider;
  }

  async getActiveNotebooks() {
    const notebooks = await this.provider.getNotebooks();

    return notebooks.filter((note) => note.activate);
  }
}

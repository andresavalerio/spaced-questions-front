import { type SetupServer } from "msw/node";

export const setupMockServer = (server: SetupServer) => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    localStorage.clear();
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
};

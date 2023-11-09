import { setupMockServer } from "helpers/tests";
import * as fetching from "helpers/fetch";
// import {
//     requestUserNotebooks,
//     requestCreateNotebook,
//     requestDeleteNotebook,
//     requestNotebookByName,
// } from "../../providers/notebook/api/NotebookAPI";
import { notebookHandlers } from "../../providers/notebook/api/NotebookMockServer";
import { Notebook } from "../../providers/notebook/types";

////
import { notebookManager } from "./LandingPage";
////

describe("LandingPage Tests", () => {
    setupMockServer(notebookHandlers);
    const fetchingMock = vi.spyOn(fetching, "fetchAPI");

    beforeEach(() => {
        fetchingMock.mockClear();
    });

    describe("Requests for backend", () => {
        describe("RequestNotebooks", () => {
            it("Should calls all owner's notebooks", async () => {
                const owner = "pedro";

                const response = await notebookManager;
                
                expect(response).toBeDefined();
            });
        });
    });
});

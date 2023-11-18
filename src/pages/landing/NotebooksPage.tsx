import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import "./NotebooksPage.css";
import { useUserProvider } from "providers/user/hooks/UserHooks";
import { isUserLogged } from "providers/user/utils/UserUtils";
import { useNotebookProvider } from "providers/notebook/hooks/NotebookHooks";
import { Notebook } from "providers/notebook/types";
import NoteEditor from "components/note-editor/NoteEditor";
import TabBar, { TabData } from "components/tab-bar/TabBar";
import Modal from "components/modal-new-tab/ModalNewTab";
import ConfirmModal from "components/confirm-modal/ConfirmModal";

interface NotebookState {
  state:
    | "default"
    | "content-changed"
    | "name-changed"
    | "content-name-changed"
    | "new"
    | "delete";
  notebook: Notebook;
}

const generateId = {
  _currentId: 0,
  generateTemporaryId: () => `temp-${generateId._currentId++}`,
};

const NotebooksPage = () => {
  const { state } = useUserProvider();

  const [updateNotebooksCount, setUpdateNotebooksCount] = useState(0);

  const NotebookProvider = useNotebookProvider();
  const [notebooksState, setNotebooksState] = useState<NotebookState[]>([]);

  const updateNotebooks = () => {
    setUpdateNotebooksCount(updateNotebooksCount + 1);
  };

  const updateNotebooksState = async () => {
    await NotebookProvider.actions.loadNotebooks("pedro").then(() => {
      const notebooks = NotebookProvider.state.data;
      const notebooksSate: NotebookState[] = [];
      notebooks?.forEach((notebook) => {
        const newNotebookTab = {
          state: "default",
          notebook: notebook,
        } as NotebookState;
        notebooksSate.push(newNotebookTab);
      });

      setNotebooksState(notebooksSate);
    });
  };

  const [notebooksTabs, setNotebooksTabs] = useState<TabData[]>([]);

  const updateNotebooksTabs = () => {
    const notebooksTabs = notebooksState?.map((notebookState) => {
      const newTab = {
        label: notebookState.notebook.name,
        content: notebookState.notebook.content,
      } as TabData;

      return newTab;
    });

    setNotebooksTabs(notebooksTabs);
  };

  useEffect(() => {
    updateNotebooksState().then(() => {
      updateNotebooksTabs();
    });
    console.log(notebooksState);
  }, [updateNotebooksCount]);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const createNewTabNotebook = (newNotebookName: string) => {
    const notebookAlreadyExist = !!notebooksTabs.find(
      (tab) => tab.label === newNotebookName
    );

    if (notebookAlreadyExist || newNotebookName.trim() === "") return;

    const newNotebooksState = [
      ...notebooksState,
      {
        state: "new",
        notebook: {
          id: generateId.generateTemporaryId(),
          name: newNotebookName,
          content: "",
          owner: "pedro",
        },
      },
    ] as NotebookState[];
    setNotebooksState(newNotebooksState);

    const newTabs = [
      ...notebooksTabs,
      {
        label: newNotebookName,
        content: "",
      } as TabData,
    ];
    setNotebooksTabs(newTabs);
    setActiveTabIndex(newTabs.length - 1);
  };

  const editorRef = useRef<HTMLTextAreaElement>(null);

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleTabContentChange = (newContent: string) => {
    const notebookName = notebooksTabs[activeTabIndex].label;

    const stateIndex = notebooksState.findIndex(
      (notebookState) => notebookState.notebook.name === notebookName
    );

    if (stateIndex < 0) return;

    const newNotebooksStates = [...notebooksState];

    newNotebooksStates[stateIndex].notebook.content = newContent;

    if (newNotebooksStates[stateIndex].state === "default")
      newNotebooksStates[stateIndex].state = "content-changed";

    setNotebooksState(newNotebooksStates);

    const newTabs = [...notebooksTabs];

    newTabs[activeTabIndex].content = newContent;

    setNotebooksTabs(newTabs);
  };

  useEffect(() => {
    focusEditor();
  }, [activeTabIndex, notebooksTabs]);

  const saveNotebooks = () => {
    console.log(notebooksState);

    notebooksState.forEach((notebookState) => {
      switch (notebookState.state) {
        case "default":
          break;
        case "new":
          NotebookProvider.actions.createNotebook(notebookState.notebook);
          break;
        case "content-changed":
          //TO-DO
          break;
        case "delete":
          NotebookProvider.actions.deleteNotebookById(
            "pedro",
            notebookState.notebook.name
          );
          break;
        default:
          break;
      }
    });
  };

  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const closeConfirmModal = () => setConfirmModalOpen(false);

  const confirmDeleteNotebook = async () => {
    const notebookName = notebooksTabs[activeTabIndex].label;
    const stateIndex = notebooksState.findIndex(
      (notebookState) => notebookState.notebook.name === notebookName
    );

    if (stateIndex < 0) return;

    const newNotebooksStates = [...notebooksState];
    newNotebooksStates[stateIndex].state = "delete";
    setNotebooksState(newNotebooksStates);

    const newTabs = [...notebooksTabs];
    newTabs.splice(activeTabIndex, 1);
    setNotebooksTabs(newTabs);

    setConfirmModalOpen(false);
  };

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalPurpose, setModalPurpose] = useState<"create" | "rename">(
    "create"
  );

  const openRenameModal = (purpose: "create" | "rename") => {
    setModalPurpose(purpose);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!isUserLogged(state)) return <Navigate to={"/login"} />;

  return (
    <div>
      <button onClick={() => updateNotebooks()}>UPDATE</button>
      <button onClick={() => saveNotebooks()}>SAVE CHANGES</button>
      <TabBar
        tabs={notebooksTabs}
        activeTab={activeTabIndex}
        onTabClick={handleTabClick}
        onAddTab={createNewTabNotebook}
      />
      <NoteEditor
        forwardedRef={editorRef}
        content={notebooksTabs[activeTabIndex]?.content || ""}
        onContentChange={handleTabContentChange}
      />
      <div style={{ float: "left", margin: "0 10px 0 50px" }}>
        <button
          className="LandingPage-buttonStyle"
          onClick={() => openRenameModal("rename")}
        >
          Renomear Caderno
        </button>
        <button
          className="LandingPage-buttonStyle"
          onClick={() => setConfirmModalOpen(true)}
        >
          Excluir Caderno
        </button>
      </div>
      <Modal />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onCancel={closeConfirmModal}
        onConfirm={confirmDeleteNotebook}
        name={
          notebooksTabs[activeTabIndex]
            ? notebooksTabs[activeTabIndex].label
            : ""
        }
      />
    </div>
  );
};

export default NotebooksPage;

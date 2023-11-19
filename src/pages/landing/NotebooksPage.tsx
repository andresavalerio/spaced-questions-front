import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import "./NotebooksPage.css";
import { useUserProvider } from "providers/user/hooks/UserHooks";
import { isUserLogged } from "providers/user/utils/UserUtils";
import { useNotebookProvider } from "providers/notebook/hooks/NotebookHooks";
import NoteEditor, {
  NoteEditorReference,
} from "components/note-editor/NoteEditor";
import TabBar, { NotebookTab } from "components/tab-bar/TabBar";
import ConfirmModal from "components/confirm-modal/ConfirmModal";
import RenameNotebookModal from "components/modal-new-tab/ModalNewTab";
import { UpdateNotebookDTO } from "providers/notebook/types";

const NotebooksPage = () => {
  const noteEditorRef = useRef<NoteEditorReference>(null);

  const { state: userState } = useUserProvider();

  const { state: notebookState, actions: notebookActions } =
    useNotebookProvider();

  const notebookTabs: NotebookTab[] = notebookState.data.map((note) => ({
    id: note.id as number,
    content: note?.content || "",
    label: note.name,
  }));

  const owner = userState.data?.username as string;

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  useEffect(() => {
    notebookActions.loadNotebooks(owner).then(() => {
      const hasNotebooks = !!notebookState.data.length;

      if (hasNotebooks) {
        noteEditorRef.current?.setActiveNotebook(notebookTabs[0]);
      }
    });
  }, []);

  if (!isUserLogged(userState)) return <Navigate to={"/login"} />;

  const hasNotebooks = !!notebookTabs.length;

  const activeNotebookTab = hasNotebooks
    ? notebookTabs[activeTabIndex]
    : undefined;

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);

    noteEditorRef.current?.setActiveNotebook(notebookTabs[index]);
  };

  const createNewNotebookTab = (newNotebookName: string) => {
    const nameAlreadyUsed = !!notebookTabs.find(
      (tab) => tab.label === newNotebookName
    );

    if (nameAlreadyUsed || newNotebookName.trim() === "") return;

    notebookActions.createNotebook(newNotebookName, owner).then(() => {
      setActiveTabIndex(notebookTabs.length);
    });
  };

  const handleEditorContentChange = (
    newContent: string,
    notebook: NotebookTab
  ) => {
    const hasRealChange = notebook.content !== newContent;

    if (!hasRealChange) return;

    const notebookId = notebook.id;

    notebookActions.updateNotebook(owner, notebookId, { newContent });
  };

  const closeConfirmModal = () => setConfirmModalOpen(false);

  const confirmDeleteNotebook = async () => {
    if (!activeNotebookTab) return;

    const notebookId = activeNotebookTab.id;

    notebookActions.deleteNotebookById(owner, notebookId).then(() => {
      setConfirmModalOpen(false);
    });
  };

  const [isRenameModalOpen, setRenameModalOpen] = useState<boolean>(false);

  const closeRenameModal = () => setRenameModalOpen(false);

  const confirmRenameNotebook = async (newName: string) => {
    if (!activeNotebookTab) return;

    const hasNameChanged = activeNotebookTab.label === newName;

    if (!newName || newName === "" || hasNameChanged) {
      setRenameModalOpen(false);
      return;
    }

    const notebookId = activeNotebookTab.id;

    notebookActions
      .updateNotebook(owner, notebookId, { newName } as UpdateNotebookDTO)
      .then(() => {
        setRenameModalOpen(false);
      });
  };

  return (
    <div>
      <TabBar
        tabs={notebookTabs}
        activeTab={activeTabIndex}
        onTabClick={handleTabClick}
        onAddTab={createNewNotebookTab}
      />
      <NoteEditor
        ref={noteEditorRef}
        onContentUpdate={handleEditorContentChange}
      />
      <div style={{ float: "left", margin: "0 10px 0 50px" }}>
        <button
          className="landing-page-button"
          onClick={() => setRenameModalOpen(true)}
        >
          Renomear Caderno
        </button>
        <button
          className="landing-page-button"
          onClick={() => setConfirmModalOpen(true)}
        >
          Excluir Caderno
        </button>
      </div>
      <RenameNotebookModal
        isOpen={isRenameModalOpen}
        onClose={closeRenameModal}
        onSave={confirmRenameNotebook}
        purpose="rename"
        currentName={activeNotebookTab?.label || ""}
      ></RenameNotebookModal>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onCancel={closeConfirmModal}
        onConfirm={confirmDeleteNotebook}
        name={activeNotebookTab?.label || ""}
      />
    </div>
  );
};

export default NotebooksPage;

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

const NotebooksPage = () => {
  const noteEditorRef = useRef<NoteEditorReference>(null);

  const { state: userState } = useUserProvider();

  const { state: notebookState, actions: notebookActions } =
    useNotebookProvider();

  const notebookTabs: NotebookTab[] = notebookState.data.map((note) => ({
    id: note.id as number,
    content: note.content,
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
      setActiveTabIndex(notebookTabs.length - 1);
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
        <button className="landing-page-button">Renomear Caderno</button>
        <button
          className="landing-page-button"
          onClick={() => setConfirmModalOpen(true)}
        >
          Excluir Caderno
        </button>
      </div>
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

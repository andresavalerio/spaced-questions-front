import { useState, useRef } from "react";
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

  const [isRenameModalOpen, setRenameModalOpen] = useState<boolean>(false);

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

    notebookActions.createNotebook(newNotebookName, owner).then((notebooks) => {
      const notebooksCreated = notebooks?.length;

      if (!notebooksCreated) return;

      const firstNotebook = notebooks[0];

      noteEditorRef.current?.setActiveNotebook({
        id: Number(firstNotebook.id),
        label: firstNotebook.name,
        content: firstNotebook.content || "",
      });

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

  const onConfirmDeleteNotebook = async () => {
    if (!activeNotebookTab) return;

    const notebookId = activeNotebookTab.id;

    notebookActions.deleteNotebookById(owner, notebookId).then(() => {
      setConfirmModalOpen(false);

      const oldLength = notebookTabs.length;

      if (oldLength === 1) return noteEditorRef.current?.cleanUp();

      const deletedNotebookIndex = notebookTabs.findIndex(
        (note) => note.id == notebookId
      );

      const isFirstNotebookDeleted = deletedNotebookIndex === 0;

      const lastNotebookIndex = notebookTabs.length - 2;

      const previousNotebookIndex = deletedNotebookIndex - 1;

      const newNotebookIndex = isFirstNotebookDeleted
        ? lastNotebookIndex
        : previousNotebookIndex;

      const newActiveNotebook = notebookTabs[newNotebookIndex];

      setActiveTabIndex(newNotebookIndex);
      noteEditorRef.current?.setActiveNotebook(newActiveNotebook);
    });
  };

  const closeRenameModal = () => setRenameModalOpen(false);

  const onConfirmRenameNotebook = async (newName: string) => {
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

  const hasNoNotebookSelected =
    !notebookTabs.length ||
    activeTabIndex < 0 ||
    activeTabIndex >= notebookTabs.length;

  return (
    <div>
      <TabBar
        tabs={notebookTabs}
        selectedNotebookId={activeNotebookTab?.id || -1}
        activeTab={activeTabIndex}
        onTabClick={handleTabClick}
        onAddTab={createNewNotebookTab}
        onRenameClick={() => setRenameModalOpen(true)}
        onDeleteClick={() => setConfirmModalOpen(true)}
      />
      <NoteEditor
        ref={noteEditorRef}
        onContentUpdate={handleEditorContentChange}
        disabled={hasNoNotebookSelected}
      />
      <RenameNotebookModal
        isOpen={isRenameModalOpen}
        onClose={closeRenameModal}
        onSave={onConfirmRenameNotebook}
        purpose="rename"
        currentName={activeNotebookTab?.label || ""}
      ></RenameNotebookModal>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onCancel={closeConfirmModal}
        onConfirm={onConfirmDeleteNotebook}
        name={activeNotebookTab?.label || ""}
      />
    </div>
  );
};

export default NotebooksPage;

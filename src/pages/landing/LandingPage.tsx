import "./LandingPage.css";
import { useState, useEffect, useRef } from "react";
import NoteEditor from "../../components/note-editor/NoteEditor";
import TabBar, { TabData } from "../../components/tab-bar/TabBar";
import Modal from "../../components/modal-new-tab/ModalNewTab";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import { useUserProvider } from "providers/user/hooks/UserHooks";
import { isUserLogged } from "providers/user/utils/UserUtils";
import { Navigate } from "react-router-dom";
import { useNotebookProvider } from "providers/notebook/hooks/NotebookHooks";
import { Notebook } from "providers/notebook/types";

interface NotebookTab {
  label: string;
  content: string;
  color: string;
}

const LandingPage = () => {

  const { state } = useUserProvider();

  if (!isUserLogged(state)) return <Navigate to={"/login"} />;

  const NotebookProvider = useNotebookProvider();

  const [newNotebooks, setNewNotebooks] = useState<Notebook[]>([]);
  const [notebooksTabs, setNotebooksTabs] = useState<TabData[]>([]);

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleTabContentChange = (newContent: string) => {
    const newTabs = [...notebooksTabs];
    newTabs[activeTab].content = newContent;
    setNotebooksTabs(newTabs);
  };

  const createNewTab = (name: string) => {
    const newTabs = [
      ...notebooksTabs,
      {
        label: !name ? `Caderno ${notebooksTabs.length + 1}` : name,
        content: ""
      } as TabData,
    ];
    setNewNotebooks([...newNotebooks, { id: 12, content: "", name: name, owner: "pedro" } as Notebook])
    setNotebooksTabs(newTabs);
    setActiveTab(newTabs.length - 1);
  };

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalPurpose, setModalPurpose] = useState<"create" | "rename">(
    "create"
  );

  const openModal = (purpose: "create" | "rename") => {
    setModalPurpose(purpose);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const editorRef = useRef<HTMLTextAreaElement>(null);

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const closeConfirmModal = () => setConfirmModalOpen(false);

  const activateFirstTab = (tabs: NotebookTab[]) =>
    setActiveTab(tabs.length - 1);


  const getNotebooks = async () => {
    console.log("Login: ", state.data?.username)

    const userNotebooks = await (
      NotebookProvider
        .actions
        .defaultNotebooks("pedro")
        .then(() => {
          const notebooks = NotebookProvider.state.data;
          console.log(notebooks)
          setNotebooksTabs([] as TabData[]);
          if (!!notebooks && notebooks.length > 0) {
            setNotebooksTabs(
              notebooks.map(notebook => {
                return { label: notebook.name, content: notebook.content } as TabData;
              }))
          }
        })
    )
  };

  const saveNotebooks = () => {

    newNotebooks.forEach(async (notebook) => {
      await NotebookProvider.actions.createNotebook(notebook).then(() => {
        setNewNotebooks([]);
      })
    })
  }

  const confirmDeleteNotebook = async () => {
    const currentNotebooks = notebooksTabs
    const deletedNotebook = notebooksTabs.splice(activeTab, 1);

    await NotebookProvider.actions.deleteNotebook("pedro", deletedNotebook[0].label)
    

    setConfirmModalOpen(false);
  }

  useEffect(() => {
    focusEditor();
  }, [activeTab, notebooksTabs]);

  return (
    <div>
      <button onClick={(actions) => getNotebooks()}>UPDATE</button>
      <button onClick={(actions) => saveNotebooks()}>SAVE</button>
      <TabBar
        tabs={notebooksTabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onAddTab={createNewTab}
      />
      <NoteEditor
        forwardedRef={editorRef}
        content={notebooksTabs[activeTab]?.content || ""}
        onContentChange={handleTabContentChange}
      />
      <div style={{ float: "left", margin: "0 10px 0 50px" }}>
        <button
          className="LandingPage-buttonStyle"
          onClick={() => openModal("rename")}
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
      <ConfirmModal isOpen={isConfirmModalOpen} onCancel={closeConfirmModal} onConfirm={confirmDeleteNotebook} />
    </div>
  );
};

export default LandingPage;

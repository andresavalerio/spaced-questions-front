import "./LandingPage.css";
import { useState, useEffect, useRef } from "react";
import NoteEditor from "../../components/note-editor/NoteEditor";
import TabBar from "../../components/tab-bar/TabBar";
import Header from "../../components/header/Header";
import Modal from '../../components/modal-new-tab/ModalNewTab'; 
import ConfirmModal from '../../components/confirm-modal/ConfirmModal'; 
import axios from 'axios';

interface Tab {
  label: string;
  content: string;
  color: string;
}

const LandingPage = () => {
  const generateRandomColor = () => "#" + ("000000" + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);

  // Estado para gerenciar as tabs (cadernos)
  const [notebooks, setNotebooks] = useState<Tab[]>([
    {
      label: "Caderno 1",
      content: "Campo de texto.... Lorem ipsum dolom...",
      color: generateRandomColor(),
    },
  ]);

  // Estado para gerenciar a tab ativa
  const [activeTab, setActiveTab] = useState<number>(0);

  // Manipulador para alterar a tab ativa
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  // Manipulador para atualizar o conteúdo da tab ativa
  const handleContentChange = (newContent: string) => {
    const newTabs = [...notebooks];
    newTabs[activeTab].content = newContent;
    setNotebooks(newTabs);
  };

  // Função para adicionar uma nova tab
  const addNewTab = (name : string) => {
    const newTabs = [
      ...notebooks,
      {
        label: !name ? `Caderno ${notebooks.length + 1}` : name,
        content: "",
        color: generateRandomColor(),
      },
    ];
    setNotebooks(newTabs);
    setActiveTab(newTabs.length - 1);
  };

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalPurpose, setModalPurpose] = useState<"create" | "rename">("create");
  
  const openModal = (purpose: "create" | "rename") => {
    setModalPurpose(purpose);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Quando a guia ativa mudar ou um novo caderno é adicionado, o foco será definido no editor
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [activeTab, notebooks]);    

  return (
    <div>
      <Header
        content={"Spaced Questions"}
      />

      <TabBar
        tabs={notebooks}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onAddTab={addNewTab}
      />

      <NoteEditor
        forwardedRef={editorRef}
        content={notebooks[activeTab]?.content || ""}
        onContentChange={handleContentChange}
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSave={(name: string) => {
          const newTabs = [...notebooks];
          newTabs[activeTab].label = name;
          setNotebooks(newTabs);
          closeModal();
        }}
        purpose={modalPurpose}
        currentName={notebooks[activeTab].label}
      />    

      <ConfirmModal 
        isOpen={isConfirmModalOpen} 
        onConfirm={() => {
            const newTabs = notebooks.filter((_, index) => index !== activeTab);
            setNotebooks(newTabs);
            setActiveTab(newTabs.length - 1); // Definir a primeira tab como ativa após a exclusão
            setConfirmModalOpen(false); // Feche o modal após a confirmação
            createNotebook(notebooks[activeTab].label, "usuario") //TODO: pegar o nome do usuario
        }}
        onCancel={() => {
            setConfirmModalOpen(false); // Simplesmente feche o modal se o usuário cancelar
        }}
        name={notebooks[activeTab].label}
      />
    </div>
  );
};

async function createNotebook(name: string, owner: string) {
  try {
    const response = await axios.post('http://localhost:PORTA/notebooks', {
      name,
      owner
    });
    console.log('Caderno criado:', response.data);
  } catch (error) {
    console.error('Erro ao criar o caderno:', error);
  }
}

export default LandingPage;

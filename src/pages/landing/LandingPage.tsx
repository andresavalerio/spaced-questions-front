import "./LandingPage.css";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import NoteEditor from "../../components/note-editor/NoteEditor";
import TabBar from "../../components/tab-bar/TabBar";

interface Tab {
  label: string;
  content: string;
  color: string;
}

const LandingPage = () => {
  const generateRandomColor = () =>
    "#" +
    ("000000" + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);

  // Estado para gerenciar as tabs (cadernos)
  const [notebooks, setNotebooks] = useState<Tab[]>([
    {
      label: "Caderno 1",
      content: "Notas do Caderno 1",
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
  const addNewTab = () => {
    const newTabs = [
      ...notebooks,
      {
        label: `Caderno ${notebooks.length + 1}`,
        content: "",
        color: generateRandomColor(),
      },
    ];
    setNotebooks(newTabs);
    setActiveTab(newTabs.length - 1);
  };

  // Função para excluir a tab ativa
  const deleteActiveTab = () => {
    Swal.fire ({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, delete!",
      cancelButtonText: "Não, cancele!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const newTabs = notebooks.filter((_, index) => index !== activeTab);
        setNotebooks(newTabs);
        setActiveTab(newTabs.length - 1); // Definir a primeira tab como ativa após a exclusão
      }
    });
  };

  // Função para renomear a tab ativa. Abrir o alerta com o nome atual como valor inicial e já selecionado o texto para fácil edição.
  // title: "Renomear caderno",
  // input: "text",
  // inputValue: tabs[activeTab].label,
  // showCancelButton: true,
  // inputValidator: (value) => {
  //   if (!value) {
  //     return "Você precisa escrever algo!";
  //   }
  // },
  // onOpen: () => {
  //   Swal.getInput().select();
  // },
  const renameActiveTab = () => {
    Swal.fire({
      title: "Renomear caderno",
      input: "text",
      inputValue: notebooks[activeTab].label,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Você precisa escrever algo!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newTabs = [...notebooks];
        newTabs[activeTab].label = result.value;
        setNotebooks(newTabs);
      }
    });

    forceInputSelection();
  };

  const forceInputSelection = () => {
    setTimeout(() => {
      const input = document.querySelector(".swal2-input");
      if (input) {
        (input as HTMLInputElement).select();
      }
    }, 100);
  };

  // Estilo padrão para os botões
  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    borderRadius: "8px",
    background: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
    transition: "all 0.3s",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  // Estados para gerenciar o seletor de cor
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");

  // Função para alterar a cor da tab ativa
  const changeTabColor = () => {
    if (colorPicker) {
      const newTabs = [...notebooks];
      newTabs[activeTab].color = selectedColor;
      setNotebooks(newTabs);
      setColorPicker(false); // Ocultar o seletor após definir a cor
    } else {
      setColorPicker(true); // Mostrar o seletor de cor
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/capa.jpg')",
        backgroundRepeat: "repeat",
        minHeight: "100vh",
      }}
    >
      <TabBar
        tabs={notebooks}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onAddTab={addNewTab}
      />

      <div style={{ float: "left", margin: "10px" }}>
        {colorPicker && (
          <input
            type="color"
            value={selectedColor}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectedColor(e.target.value)
            }
          />
        )}
        <button onClick={changeTabColor} style={buttonStyle}>
          {colorPicker ? "Confirmar Cor" : "Mudar Cor do Caderno"}
        </button>
        <button onClick={renameActiveTab} style={buttonStyle}>
          Renomear Caderno
        </button>
        <button onClick={deleteActiveTab} style={buttonStyle}>
          Excluir Caderno
        </button>
      </div>

      <NoteEditor
        content={notebooks[activeTab]?.content || ""}
        onContentChange={handleContentChange}
      />
    </div>
  );
};

export default LandingPage;

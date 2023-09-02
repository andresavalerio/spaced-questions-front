import { MouseEventHandler } from "react";
import { TabData } from "../../types/TabData";
import Tab from "../tab/Tab";

function TabBar({
  tabs,
  activeTab,
  onTabClick,
  onAddTab,
}: {
  tabs: TabData[];
  activeTab: number;
  onTabClick: (input: number) => void;
  onAddTab: MouseEventHandler;
}) {
  return (
    <div
      style={{
        padding: "58px 48px 0",
        display: "flex",
        alignItems: "center",
        background: "white",
        borderRadius: "8px",
      }}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          isActive={index === activeTab}
          onClick={() => onTabClick(index)}
          color={tab.color} // Certifique-se de passar a cor aqui.
        />
      ))}
      <button onClick={onAddTab} 
        style={{
          width: '60px',  // Definindo uma largura específica para o botão
          height: '33px',  // Altura do botão igual à altura da tab
          borderRadius: '12px 12px 0 0',
          backgroundColor: 'white',
          color: 'black',
          fontWeight: 'bold',
          border: '1px #c7c7c7 solid',
          cursor: 'pointer',
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',  // Centraliza horizontalmente
          fontSize: '15px',  // Tamanho da fonte para o "+"
          position: 'relative',  // Para possibilitar a centralização do '+'
        }}>
        <div 
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',  
            border: "2px solid black", 
            backgroundColor: 'white',  
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>+</div>
      </button>
    </div>
  );
}

export default TabBar;

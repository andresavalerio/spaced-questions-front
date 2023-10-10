import './TabBar.css';
import React, { useState } from "react";
import { TabData } from "../../types/TabData";
import Tab from "../tab/Tab";
import Modal from '../modal-new-tab/ModalNewTab';

interface TabBarProps {
  tabs: TabData[];
  activeTab: number;
  onTabClick: (input: number) => void;
  onAddTab: (name : string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabClick, onAddTab }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleAddTabClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveNewTab = (name: string) => {
    onAddTab(name);
    setModalOpen(false);
  };

  return (
    <div className="TabBar" >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          isActive={isModalOpen ? false : index === activeTab}
          onClick={() => onTabClick(index)}
        />
      ))}
      <button className={`TabBar-buttonCreateNewTab ${isModalOpen ? 'active' : ''}`} onClick={handleAddTabClick}>
        <div className={`TabBar-plusSign ${isModalOpen ? 'active' : ''}`}>
          +
        </div>
      </button>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onSave={handleSaveNewTab}
        purpose="create"
        currentName=""
      />
    </div>
  );
}

export default TabBar;

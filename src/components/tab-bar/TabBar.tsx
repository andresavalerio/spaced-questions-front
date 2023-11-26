import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TabBar.module.css";
import Tab from "../tab/Tab";
import Modal from "../modal-new-tab/ModalNewTab";
import PuzzleSVG from "./Puzzle.svg";

export type NotebookTab = {
  id: number;
  label: string;
  content: string;
};

interface TabBarProps {
  tabs: NotebookTab[];
  activeTab: number;
  selectedNotebookId: number;
  onTabClick: (input: number) => void;
  onAddTab: (name: string) => void;
  onDeleteClick: () => void;
  onRenameClick: () => void;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabClick,
  onAddTab,
  onDeleteClick,
  onRenameClick,
  selectedNotebookId,
}) => {
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
    <div className={styles["TabBar"]}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          isActive={isModalOpen ? false : index === activeTab}
          onClick={() => onTabClick(index)}
          onDeleteClick={onDeleteClick}
          onRenameClick={onRenameClick}
        />
      ))}
      <button
        className={`${styles["TabBar-buttonCreateNewTab"]} ${
          isModalOpen ? styles["active"] : ""
        }`}
        onClick={handleAddTabClick}
      >
        <div
          className={`${styles["TabBar-plusSign"]} ${
            isModalOpen ? styles["active"] : ""
          }`}
        >
          +
        </div>
      </button>
      <div className={styles["cards-visualization-container"]}>
        <Link to={`../cards/${selectedNotebookId}`}>
          <button className={styles["cards-visualization-button"]}>
            <div className={styles["card-button-container"]}>
              <div>
                <img src={PuzzleSVG} />
              </div>
              <div>
                <span>Visualizar cards</span>
              </div>
            </div>
          </button>
        </Link>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNewTab}
        purpose="create"
        currentName=""
      />
    </div>
  );
};

export default TabBar;

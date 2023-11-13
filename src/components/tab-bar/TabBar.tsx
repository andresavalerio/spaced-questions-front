import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TabBar.module.css";
import Tab from "../tab/Tab";
import Modal from "../modal-new-tab/ModalNewTab";

export type TabData = {
  label: string;
  content: string;
  color: string;
};

interface TabBarProps {
  tabs: TabData[];
  activeTab: number;
  onTabClick: (input: number) => void;
  onAddTab: (name: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabClick,
  onAddTab,
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
      <div className={styles["cards-vizualization-container"]}>
        <Link to={"cards"}>
          <button className={styles["cards-vizualization-button"]}>
            <div className={styles["card-button-container"]}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M13.1666 7.33332H12.1666V4.66666C12.1666 3.93332 11.5666 3.33332 10.8333 3.33332H8.16659V2.33332C8.16659 1.41332 7.41992 0.666656 6.49992 0.666656C5.57992 0.666656 4.83325 1.41332 4.83325 2.33332V3.33332H2.16659C1.43325 3.33332 0.839919 3.93332 0.839919 4.66666V7.19999H1.83325C2.82659 7.19999 3.63325 8.00666 3.63325 8.99999C3.63325 9.99332 2.82659 10.8 1.83325 10.8H0.833252V13.3333C0.833252 14.0667 1.43325 14.6667 2.16659 14.6667H4.69992V13.6667C4.69992 12.6733 5.50659 11.8667 6.49992 11.8667C7.49325 11.8667 8.29992 12.6733 8.29992 13.6667V14.6667H10.8333C11.5666 14.6667 12.1666 14.0667 12.1666 13.3333V10.6667H13.1666C14.0866 10.6667 14.8333 9.91999 14.8333 8.99999C14.8333 8.07999 14.0866 7.33332 13.1666 7.33332Z"
                    fill="white"
                  />
                </svg>
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

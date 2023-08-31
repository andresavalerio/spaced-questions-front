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
        display: "flex",
        alignItems: "center",
        background: "#f0f0f0",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          isActive={index === activeTab}
          onClick={() => onTabClick(index)}
          color={tab.color} // Certifique-se de passar a cor aqui.
          onRename={(input: string) => null}
        />
      ))}
      <button onClick={onAddTab} style={{ marginLeft: "10px" }}>
        +
      </button>
    </div>
  );
}

export default TabBar;

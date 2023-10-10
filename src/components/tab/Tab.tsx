import { MouseEventHandler } from "react";
import './Tab.css';

function Tab({
  label,
  isActive,
  onClick,
  }: {
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler;
}) {
  return (
    <div
      onClick={onClick}
      className={`tab-container ${isActive ? 'active' : 'inactive'}`}
    >
      <span className="tab-label">
        {label}
      </span>
    </div>
  );
}

export default Tab;

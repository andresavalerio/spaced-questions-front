import { MouseEventHandler } from "react";
import styles from "./Tab.module.css";

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
      className={`${styles["tab-container"]} ${
        isActive ? styles["active"] : styles["inactive"]
      }`}
      onClick={onClick}
    >
      {isActive && (
        <div className={styles["alt-container"]}>
          <span className={`${styles["dot"]} ${styles["change-name"]}`}><img src="/chave-de-rosca.svg"></img></span>
          <span className={`${styles["dot"]} ${styles["delete"]}`}><img src="/lixeira.svg"></img></span>
        </div>
      )}

      <span className="tab-label">{label}</span>
    </div>
  );
}

export default Tab;

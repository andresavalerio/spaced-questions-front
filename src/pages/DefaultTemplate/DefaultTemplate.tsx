import { Outlet } from "react-router-dom";
import styles from "./DefaultTemplate.module.css";
  const DefaultTemplate = () => {
  
  return (
    <div className={styles["login-container"]}>
      <div className={styles["logo-container"]}>Spaced Questions</div>
      <div className={styles["login-area-container"]}>
        <Outlet/>
      </div>
    </div>
  );
};

export default DefaultTemplate;

import { Outlet } from "react-router-dom";
import styles from "./UserLayout.module.css";
import Header from "components/header/Header";
import { CardProvider } from "providers/cards/CardProvider";

const UserLayout = () => {
  return (
    <div className={styles["user-container"]}>
      <div className={styles["header-container"]}>
        <Header content={"Spaced Questions"} />
      </div>
      <div className={styles["application-container"]}>
        <CardProvider>
          <Outlet />
        </CardProvider>
        </div>
    </div>
  );
};

export default UserLayout;
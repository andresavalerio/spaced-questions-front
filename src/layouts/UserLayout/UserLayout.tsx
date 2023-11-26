import { Outlet } from "react-router-dom";
import styles from "./UserLayout.module.css";
import Header from "components/header/Header";
import { CardProvider } from "providers/cards/CardProvider";
import { NotebookProvider } from "providers/notebook/NotebookProvider";
import { useUserProvider } from "providers/user/hooks/UserHooks";
import { isUserLogged } from "providers/user/utils/UserUtils";

const UserLayout = () => {
  const { state } = useUserProvider();

  const isLogged = isUserLogged(state);

  return (
    <div className={styles["user-container"]}>
      <div className={styles["header-container"]}>
        <Header content={"Spaced Questions"} showUserImage={isLogged} />
      </div>
      <div className={styles["application-container"]}>
        <CardProvider>
          <NotebookProvider>
            <Outlet />
          </NotebookProvider>
        </CardProvider>
      </div>
    </div>
  );
};

export default UserLayout;

import { Outlet } from "react-router-dom";
import styles from "./UserLayout.module.css";
import Header from "components/header/Header";
import { CardProvider } from "providers/cards/CardProvider";
import { NotebookProvider } from "providers/notebook/NotebookProvider";
import { useUserProvider } from "providers/user/hooks/UserHooks";
import { isUserLogged } from "providers/user/utils/UserUtils";
import React from "react";
import { useNotebookProvider } from "providers/notebook/hooks/NotebookHooks";

const CardsLayout = () => {
  const { state } = useUserProvider();
  const {
    actions: { loadNotebooks },
  } = useNotebookProvider();

  React.useEffect(() => {
    loadNotebooks(state.data?.username || "");
  }, []);

  return (
    <CardProvider>
      <Outlet />
    </CardProvider>
  );
};

const UserLayout = () => {
  const { state } = useUserProvider();

  const isLogged = isUserLogged(state);

  return (
    <div className={styles["user-container"]}>
      <div className={styles["header-container"]}>
        <Header content={"Spaced Questions"} showUserImage={isLogged} />
      </div>
      <div className={styles["application-container"]}>
        <NotebookProvider>
          <CardsLayout />
        </NotebookProvider>
      </div>
    </div>
  );
};

export default UserLayout;

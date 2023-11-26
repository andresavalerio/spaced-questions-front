import { useNotebookProvider } from "providers/notebook/hooks/NotebookHooks";
import styles from "./CardsPage.module.css";
import { useParams } from "react-router-dom";
import React from "react";
import { useCardProvider } from "providers/cards/hooks/CardHooks";
import { useUserProvider } from "providers/user/hooks/UserHooks";
import Card from "components/card/Card";

const CardsPage = () => {
  const params = useParams();

  const notebookId = params["notebookId"];

  const { state: userState } = useUserProvider();
  const { state: cardState } = useCardProvider();
  const { state: notebookState } = useNotebookProvider();

  const {
    actions: { getCards },
  } = useCardProvider();

  const selectedNotebook = notebookState.data.find(
    (notebook) => String(notebook.id) == notebookId
  );

  const username = userState.data?.username;

  React.useEffect(() => {
    if (username && notebookId) getCards(username, notebookId);
  }, [username, notebookId]);

  return (
    <div className={styles["cards-page-container"]}>
      <div className={styles["notebook-name"]}>{selectedNotebook?.name}</div>
      <div className={styles["notebook-cards"]}>
        {cardState.data?.map((card) => (
          <Card cardContent={card} />
        ))}
      </div>
    </div>
  );
};

export default CardsPage;

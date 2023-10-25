import { useState } from "react";
import styles from "./cardsPage.module.css";
import Card from "components/card/Card";
import { CardModel } from "providers/cards/types";

const CardsPage = () => {

  const [notebook] = useState("Caderno");

  const userCards: CardModel[] = [];

  return (
    <div className={styles["cards-page-container"]}>
      <div className={styles["notebook-name"]}>{notebook}</div>
      <div className={styles["notebook-cards"]}>
        {userCards.map((card) => <Card cardContent={card}/>)}
      </div>
    </div>
  );
};

export default CardsPage;

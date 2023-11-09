import { useState } from "react";
import styles from "./cardsPage.module.css";
import Card from "components/card/Card";
import { useLoaderData } from "react-router-dom";
import { Card as CardModel } from "providers/cards/types";

const CardsPage = () => {
  const [notebook] = useState("Caderno");

  const cards = useLoaderData() as CardModel[];

  return (
    <div className={styles["cards-page-container"]}>
      <div className={styles["notebook-name"]}>{notebook}</div>
      <div className={styles["notebook-cards"]}>
        {!!cards && cards.map((card) => <Card cardContent={card} />)}
      </div>
    </div>
  );
};

export default CardsPage;

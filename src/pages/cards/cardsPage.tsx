import { useState } from "react";
import styles from "./cardsPage.module.css";
import Card from "components/card/Card";
import { useLoaderData } from "react-router-dom";
import { Card as CardModel } from "providers/cards/types";
import { useCardProvider } from "providers/cards/hooks/CardHooks";

const CardsPage = () => {
  const [notebook] = useState("Caderno");

  const cardsProvider = useCardProvider();

  const cards = useLoaderData() as CardModel[];

  const getCards = async () => {
    console.log("Card State: ", cardsProvider.state.loading);

    const useCards = await (
      cardsProvider
        .actions
        .getCards("Pedro", "Caderno de Física")
        .then(() => {
          const cards = cardsProvider.state.data;  
          console.log(cards);

          if(cards)
            console.log("Foi? Kk");

        })
      )
    } 


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

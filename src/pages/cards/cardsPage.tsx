import { useState } from "react";
import styles from "./cardsPage.module.css";
import Card from "components/card/Card";
import { useCardProvider } from "providers/cards/hooks/CardHooks";

const CardsPage = () => {
  const {
    state: { data, loading },
    actions: { getCards },
  } = useCardProvider();

  const [notebook] = useState("Caderno");

  return (
    <div className={styles["cards-page-container"]}>
      <div className={styles["notebook-name"]}>{notebook}</div>
      <div className={styles["notebook-cards"]}>
        <button
          onClick={() => {
            getCards("pedro", "testes");
            // console.log(data);
            // console.log(loading)
          }}
        ></button>
        <button
          onClick={() => {
            console.log(data);
            console.log(loading)
          }}
        ></button>
        {!!data && data.map((card) => <Card cardContent={card} />)}
      </div>
    </div>
  );
};

export default CardsPage;

import Card, { CardModel } from "components/card/Card";
import styles from "./cardsPage.module.css";

const CardsPage = () => {

  const userCards: CardModel[] = (() => {
    const cards: CardModel[] = []
    for (let index = 0; index < 10; index++) {
      cards.push(new CardModel(index.toString(),"none")); 
    }
    return cards
  })();

  return (
    <div className={styles["cards-page-container"]}>
      <div className={styles["notebook-name"]}>Caderno</div>
      <div className={styles["notebook-cards"]}>
        {userCards.map((card) => <Card cardContent={card}/>)}
      </div>
    </div>
  );
};

export default CardsPage;

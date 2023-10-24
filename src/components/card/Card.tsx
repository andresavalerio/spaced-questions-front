import { useState } from "react";
import styles from "./Card.module.css";

const Card = () => {
  const [cardText, setCardText] = useState("Card");

  const flipCard = () => {
    console.log("flip");
    if (cardText === "Card") setCardText("flip");
    else setCardText("Card");
  };

  return (
    <div
      onClick={flipCard}
      className={`${styles["card-container"]} ${
        cardText === "Card" ? styles["card-question"] : styles["card-answer"]
      }`}
    >
      {cardText}
    </div>
  );
};

export default Card;

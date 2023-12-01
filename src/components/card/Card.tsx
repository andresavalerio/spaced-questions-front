import { useState } from "react";
import styles from "./Card.module.css";
import { Card as CardModel } from "providers/cards/types";

import Thumbs from "/thumbs-up.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type CardProp = {
  cardContent: CardModel;
};

const Card: React.FC<CardProp> = ({ cardContent }) => {
  const question = cardContent.question;
  const answer = cardContent.answer;

  const [cardText, setCardText] = useState(question);

  const flipCard = () => {
    if (cardText === question) {
      setCardText(answer);
    } else {
      setCardText(question);
    }
  };

  return (
    <div>
      <div
        onClick={flipCard}
        className={`${styles["card-container"]} ${
          cardText === question
            ? styles["card-question"]
            : styles["card-answer"]
        }`}
      >
        {cardText}
      </div>
      <div
        className="card-actions-container"
        style={{
          display: "flex",
          gap: "5px",
          padding: "5px 5px 5px 0",
          justifyContent: "space-between",
          visibility: cardText === question ? "hidden" : "visible",
        }}
      >
        <div
          className="card-like-deslike-container"
          style={{ display: "flex", gap: "10px" }}
        >
          <img src={Thumbs} alt="thumbs-up" />
          <img src={Thumbs} alt="thumbs-up" style={{ rotate: "180deg" }} />
        </div>
        <div
          className="card-star-classification"
          style={{ display: "flex", gap: "5px" }}
        >
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
        </div>
      </div>
    </div>
  );
};

export default Card;

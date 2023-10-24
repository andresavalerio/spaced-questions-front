import Card from "components/card/Card";
import styles from "./cardsPage.module.css";

const CardsPage = () => {
  return (
    <div className={styles["cards-page-container"]}>
      <div className={styles["notebook-name"]}>Caderno</div>
      <div className={styles["notebook-cards"]}>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
};

export default CardsPage;

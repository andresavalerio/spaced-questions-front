import styles from './cardsPage.module.css'

const CardsPage = () => {
  return <div className={styles['cards-page-container']}>
  <div className={styles['notebook-name']}>Caderno</div>
  <div className={styles['notebook-cards']}>Cards</div>
  </div>;
};

export default CardsPage
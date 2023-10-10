import styles from "./Header.module.css";
import UserImage from "./user-image/UserImage";

function Header({
  content,
  showUserImage
}: {
  content: string;
  showUserImage?: boolean;
}) {
  return (
    <div className={styles.Header}>
      <div>{content}</div>
      <UserImage showUserImage={showUserImage}/>
    </div>
  );
}

export default Header;

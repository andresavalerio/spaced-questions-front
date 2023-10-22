import styles from "./HelperText.module.css";
import { FC } from "react";
import { Link } from "react-router-dom";

type HelperTextProps = {
  redirectTo: string;
  label: string;
};

const HelperText: FC<HelperTextProps> = ({ redirectTo, label }) => {
  return (
    <p className={styles["helper-text"]}>
      {label}
      <Link
        style={{ marginLeft: "12px", textDecoration: "none" }}
        to={redirectTo}
      >
        <span>Clique aqui</span>
      </Link>
    </p>
  );
};

export default HelperText;

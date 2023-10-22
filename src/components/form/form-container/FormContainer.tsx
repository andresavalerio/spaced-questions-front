import { FC } from "react";
import styles from "./FormContainer.module.css";

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

const FormContainer: FC<FormProps> = ({ children, ...props }) => {
  return (
    <div className={styles["forms-container"]}>
      <form {...props}>
        <div className={styles["forms-content-container"]}>{children}</div>
      </form>
    </div>
  );
};

export default FormContainer;

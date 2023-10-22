import styles from "./FormButton.module.css";
import { FC } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const FormButton: FC<ButtonProps> = ({
  className,
  disabled,
  children,
  ...props
}) => {
  const errorClassName = disabled ? styles["deactivated-button"] : "";

  const classNames =
    styles["cadastrar-button"] + " " + errorClassName + " " + className;

  return (
    <div className={styles["cadastrar-button-container"]}>
      <button disabled={disabled} className={classNames} {...props}>
        {children}
      </button>
    </div>
  );
};

export default FormButton;

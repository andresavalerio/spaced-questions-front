import React from "react";
import styles from "./TextField.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type CustomProps = {
  label?: string;
  errorLabel?: string;
  valid?: boolean;
  isRequired?: boolean;
};

type InputFieldProps = InputProps & CustomProps;

const TextField: React.FC<InputFieldProps> = ({
  onChange,
  label,
  errorLabel,
  value,
  valid,
  id,
  onBlur,
  className,
  isRequired = false,
  ...props
}) => {
  const [touched, setTouched] = React.useState<boolean>(false);

  const isValidated = valid === undefined ? true : valid;

  const hasContent = isRequired ? !!value : true;

  const isError = !isValidated || !hasContent;

  const errorClassName = isError && touched ? styles.invalid : "";

  return (
    <div className={styles["forms-fields-container"]}>
      <label htmlFor={id}>{label}</label>
      <input
        value={value}
        type="text"
        id={id}
        onBlur={(e) => {
          setTouched(true);
          if (onBlur) onBlur(e);
        }}
        onChange={onChange}
        className={errorClassName + " " + className}
        {...props}
      />
      {isError && touched && errorLabel && (
        <div className={styles["forms-error-message"]}>
          <p>{errorLabel}</p>
        </div>
      )}
    </div>
  );
};

export default TextField;

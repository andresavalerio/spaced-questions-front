import { Link } from "react-router-dom";
import styles from "./RegisterForms.module.css";
import { useState, useEffect } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type BaseInputProps = {
  label: string;
  errorLabel: string;
  touched: boolean;
  isException: boolean;
  setTouched: React.Dispatch<React.SetStateAction<boolean>>;
  handleException: React.ChangeEventHandler<HTMLInputElement>;
};

type FormFieldInput = InputProps & BaseInputProps;

const FormFieldInput = (props: FormFieldInput) => {
  return (
    <div className={styles["forms-fields-container"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        {...props}
        type={props.type}
        id={props.id}
        onChange={(event) => {
          if (props.onChange) props.onChange(event);
          props.setTouched(true);
          props.handleException(event);
        }}
        className={
          (props.isException && props.touched ? styles.invalid : "") +
          ` ${props.className}`
        }
      />
      {props.isException && props.touched && (
        <div className={styles["forms-error-message"]}>
          <p>{props.errorLabel}</p>
        </div>
      )}
    </div>
  );
};

const RegisterForms = () => {
  const uniLogo = "logo.jpeg";

  const [userName, setUserName] = useState<string>("");
  const [isBlankUserName, setIsBlankUserName] = useState<boolean>(true);
  const [userNameTouched, setUserNameTouched] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const strongPasswordRegex =
    /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

  const [repetedPassword, setRepetedPassword] = useState<string>("");
  const [isRepetedPasswordValid, setIsRepetedPasswordValid] =
    useState<boolean>(false);
  const [repetedPasswordTouched, setRepetedPasswordTouched] =
    useState<boolean>(false);

  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true);

  useEffect(() => {
    const areAllFieldsValid =
      !isBlankUserName &&
      isValidEmail &&
      isPasswordValid &&
      isRepetedPasswordValid;

    setIsButtonDisable(!areAllFieldsValid);
  }, [isBlankUserName, isValidEmail, isPasswordValid, isRepetedPasswordValid]);

  return (
    <div className={styles["forms-container"]}>
      <form action="">
        <div className={styles["forms-containt-container"]}>
          <div className={styles["image-container"]}>
            <img src={uniLogo} alt="University" width={`100vw`} />
          </div>
          <FormFieldInput
            errorLabel="Insira seu Nome Completo"
            handleException={(event) =>
              setIsBlankUserName(
                event.target.value.trim() === "" ? true : false
              )
            }
            isException={isBlankUserName}
            label="Nome Completo"
            setTouched={setUserNameTouched}
            touched={userNameTouched}
            onChange={(event) => setUserName(event.target.value)}
            id="Nome"
            type="text"
            style={{
              backgroundColor: 'red'
            }}
          />
          <div className={styles["forms-fields-container"]}>
            <label htmlFor="Nome">Nome Completo</label>
            <input
              type="text"
              id="Nome"
              onChange={(event) => {
                setUserName(event.target.value);
                setUserNameTouched(true);
                setIsBlankUserName(
                  event.target.value.trim() === "" ? true : false
                );
              }}
              className={
                isBlankUserName && userNameTouched ? styles.invalid : ""
              }
            />
            {isBlankUserName && userNameTouched && (
              <div className={styles["forms-error-message"]}>
                <p>Insira seu Nome Completo</p>
              </div>
            )}
          </div>

          <div className={styles["forms-fields-container"]}>
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailTouched(true);
                setIsValidEmail(
                  validEmailRegex.test(event.target.value.trim())
                );
              }}
              className={!isValidEmail && emailTouched ? styles.invalid : ""}
            />
            {!isValidEmail && emailTouched && (
              <div className={styles["forms-error-message"]}>
                <p>Insira um e-mail válido</p>
              </div>
            )}
          </div>

          <div className={styles["forms-fields-container"]}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordTouched(true);
                setIsPasswordValid(
                  strongPasswordRegex.test(event.target.value)
                );
              }}
              className={
                !isPasswordValid && passwordTouched ? styles.invalid : ""
              }
            />
            {!isPasswordValid && passwordTouched && (
              <div className={styles["forms-error-message"]}>
                <p>Insira uma senha forte</p>
              </div>
            )}
          </div>

          <div className={styles["forms-fields-container"]}>
            <label htmlFor="password-confirmation">Confirmar Senha</label>
            <input
              type="password"
              id="password-confirmation"
              onChange={(event) => {
                setRepetedPassword(event.target.value);
                setRepetedPasswordTouched(true);
                setIsRepetedPasswordValid(event.target.value === password);
              }}
              className={
                !isRepetedPasswordValid && repetedPasswordTouched
                  ? styles.invalid
                  : ""
              }
            />
            {!isRepetedPasswordValid && repetedPasswordTouched && (
              <div className={styles["forms-error-message"]}>
                <p>As senhas não correspondem</p>
              </div>
            )}
          </div>

          <div className={styles["cadastrar-button-container"]}>
            <button
              className={`${styles["cadastrar-button"]} ${
                isButtonDisable ? styles["deactivated-button"] : ""
              }`}
              disabled={isButtonDisable}
            >
              Cadastrar
            </button>
          </div>

          <p className={styles["not-registe-text"]}>
            Já possui cadastro?{" "}
            <Link style={{ textDecoration: "none" }} to="/login">
              <span>Clique aqui</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForms;

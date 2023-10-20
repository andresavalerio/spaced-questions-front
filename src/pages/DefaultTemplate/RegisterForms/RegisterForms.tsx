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

    console.log([isBlankUserName, isValidEmail, isPasswordValid, isRepetedPasswordValid],areAllFieldsValid)

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
          />
          <FormFieldInput
            errorLabel="Insira um email valido"
            handleException={(event) => {
              setIsValidEmail(validEmailRegex.test(event.target.value.trim()));
            }}
            isException={!isValidEmail}
            label="E-mail"
            setTouched={setEmailTouched}
            touched={emailTouched}
            onChange={(event) => setEmail(event.target.value)}
            id="Email"
            type="text"
          ></FormFieldInput>
          <FormFieldInput
            errorLabel="Insira uma senha válida"
            handleException={(event) => {
              setIsPasswordValid(strongPasswordRegex.test(event.target.value));
              setIsRepetedPasswordValid(repetedPassword === event.target.value);
            }}
            isException={!isPasswordValid}
            label="Senha"
            setTouched={setPasswordTouched}
            touched={passwordTouched}
            onChange={(event) => setPassword(event.target.value)}
            id="password"
            type="password"
          ></FormFieldInput>
          <FormFieldInput
            errorLabel="As senhas não correspondem"
            handleException={(event) => {
              setIsRepetedPasswordValid(event.target.value === password);
            }}
            isException={!isRepetedPasswordValid}
            label="Conifirmar Senha"
            setTouched={setRepetedPasswordTouched}
            touched={repetedPasswordTouched}
            onChange={(event) => setRepetedPassword(event.target.value)}
            id="repetedpassword"
            type="password"
          ></FormFieldInput>
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

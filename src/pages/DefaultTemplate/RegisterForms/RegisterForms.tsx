import { Link } from "react-router-dom";
import styles from "./RegisterForms.module.css";
import { useState } from "react";

const RegisterForms = () => {
  const uniLogo = "logo.jpeg";

  const valid = true;

  const [userName, setUserName] = useState("");
  const [isBlankUserName, setIsBlankUserName] = useState(false);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const strongPasswordRegex = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

  const [repetedPassword, setRepetedPassword] = useState("")
  const [isRepetedPasswordValid, setIsRepetedPasswordValid] = useState(true);

  return (
    <div className={styles["forms-container"]}>
      <form action="">
        <div className={styles["forms-containt-container"]}>
          <div className={styles["image-container"]}>
            <img src={uniLogo} alt="University" width={`100vw`} />
          </div>
          <div className={styles["forms-fields-container"]}>
            <label htmlFor="Nome">Nome Completo</label>
            <input
              type="text"
              id="Nome"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
              onBlur={(event) => {
                event.target.value.trim() === ""
                  ? setIsBlankUserName(true)
                  : setIsBlankUserName(false);
              }}
              className={isBlankUserName ? styles.invalid : ""}
            />
            {isBlankUserName && (
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
              }}
              onBlur={(event) => {
                validEmailRegex.test(event.target.value.trim())
                  ? setIsValidEmail(true)
                  : setIsValidEmail(false);
              }}
              className={!isValidEmail ? styles.invalid : ""}
            />
            {!isValidEmail && (
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
              onChange={(event) => {setPassword(event.target.value)}}
              onBlur={(event) => {
                strongPasswordRegex.test(event.target.value)
                ? setIsPasswordValid(true)
                : setIsPasswordValid(false)
              }}
              className={!isPasswordValid ? styles.invalid : ''}
            />
            {!isPasswordValid && <div className={styles["forms-error-message"]}>
              <p>Insira uma senha forte</p>
            </div>}
          </div>
          <div className={styles["forms-fields-container"]}>
            <label htmlFor="password-confirmation">Confirmar Senha</label>
            <input type="password" id="password-confirmation" onChange={event => {setRepetedPassword(event.target.value)}}
             onBlur={(event) => {
              event.target.value !== '' && repetedPassword == password
              ? setIsRepetedPasswordValid(true) 
              : setIsRepetedPasswordValid(false)      
             }}/>
            {!isRepetedPasswordValid && <div className={styles["forms-error-message"]}>
              <p>As senhas não correspondem</p>
            </div>}
          </div>
          <div className={styles["cadastrar-button-container"]}>
            <Link to="/login">
              <button className={styles["cadastrar-button"]}>Cadastrar</button>
            </Link>
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

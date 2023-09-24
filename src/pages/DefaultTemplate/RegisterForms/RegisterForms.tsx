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
                console.log(isBlankUserName);
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
                validEmailRegex.test(event.target.value)
                  ? setIsValidEmail(true)
                  : setIsValidEmail(false);
                console.log(isValidEmail);
              }}
            ></input>
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
              className={valid ? styles.invalid : ""}
            ></input>
            <div className={styles["forms-error-message"]}>
              <p>Insira uma senha forte</p>
            </div>
          </div>
          <div className={styles["forms-fields-container"]}>
            <label htmlFor="password-confirmation">Confirmar Senha</label>
            <input type="password" id="password-confirmation"></input>
            <div className={styles["forms-error-message"]}>
              <p>As senhas não correspondem</p>
            </div>
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

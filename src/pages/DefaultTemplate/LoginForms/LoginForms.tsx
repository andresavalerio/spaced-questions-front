import { Link } from "react-router-dom";
import { FormEventHandler, useState } from "react";
import styles from "./LoginForms.module.css";

const LoginForms = () => {
  const uniLogo = "logo.jpeg";

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const { login, password } = document.forms[0];
    console.log(login, password);
  };


  return (
    <div className={styles["forms-container"]}>
      <form onSubmit={handleSubmit}>
        <div className={styles["forms-containt-container"]}>
          <div className={styles["image-container"]}>
            <img src={uniLogo} alt="University" width={`100vw`} />
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
            <input type="password" id="password"></input>
          </div>
          <p className={styles["forgot-password-text"]}>
            esqueceu sua senha?{" "}
            <Link style={{ textDecoration: "none" }} to="/forgot-password">
              <span>Clique aqui</span>
            </Link>
          </p>
          <div className={styles["login-button-container"]}>
            <Link style={{ textDecoration: "none" }} to="/landingPage">
              <button className={styles["login-button"]}>Login</button>
            </Link>
          </div>
          <p className={styles["not-registe-text"]}>
            Ainda não possui cadastro?
            <Link style={{ textDecoration: "none" }} to="/register">
              <span>Clique aqui</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForms;

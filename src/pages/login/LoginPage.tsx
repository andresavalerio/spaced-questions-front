import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/header/Header";
import { useLoginStore } from "../../stores/login/LoginStore";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const { setUser } = useLoginStore((state) => state);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const uniLogo = "unifesp-logo.svg";

  return (
    <div className={styles["login-container"]}>
      <div className={styles["logo-container"]}>Spaced Questions</div>
      <div className={styles["login-area-container"]}>
        <div className={styles["forms-container"]}>
          <form action="">
            <div className={styles["forms-containt-container"]}>
              <div className={styles["image-container"]}>
                <img src={uniLogo} alt="University" />
              </div>
              <div className={styles["forms-fields-container"]}>
                <label htmlFor="login">E-mail</label>
                <input type="text" id="login"></input>
              </div>
              <div className={styles["forms-fields-container"]}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password"></input>
              </div>
              <p className={styles["forgot-password-text"]}>
                esqueceu sua senha?{" "}
                <Link style={{ textDecoration: "none" }} to="/forgot-password">
                  <span>Clique aqui</span>
                </Link>
              </p>
              <div className={styles["login-button-container"]}>
                <Link to="/landingPage">
                  <button className={styles["login-button"]}>Login</button>
                </Link>
              </div>
              <p className={styles["not-registe-text"]}>
                Ainda não possui cadastro?{" "}
                <Link style={{ textDecoration: "none" }} to="/register">
                  <span>Clique aqui</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

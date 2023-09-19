import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./RegisterForms.module.css";

const RegisterForms = () => {
  const uniLogo = "logo.jpeg";

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles["forms-container"]}>
      <form action="">
        <div className={styles["forms-containt-container"]}>
          <div className={styles["image-container"]}>
            <img src={uniLogo} alt="University" width={`100vw`} />
          </div>
          <div className={styles["forms-fields-container"]}>
            <label htmlFor="Nome">Nome Completo</label>
            <input type="text" id="Nome"></input>
          </div>
          <div className={styles["forms-fields-container"]}>
            <label htmlFor="email">E-mail</label>
            <input type="text" id="email"></input>
          </div>
          <div className={styles["forms-fields-container"]}>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password"></input>
          </div>
          <div className={styles["forms-fields-container"]}>
            <label htmlFor="password-confirmation">Confirmar Senha</label>
            <input type="password" id="password-confirmation"></input>
          </div>
          <div className={styles["cadastrar-button-container"]}>
            <Link to="/">
              <button className={styles["cadastrar-button"]}>Cadastrar</button>
            </Link>
          </div>
          <p className={styles["not-registe-text"]}>
            Já possui cadastro?{" "}
            <Link style={{ textDecoration: "none" }} to="/">
              <span>Clique aqui</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForms;
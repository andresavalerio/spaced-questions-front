import { Link } from "react-router-dom";
import styles from "./RegisterForms.module.css";
import { useId } from "react";

const RegisterForms = () => {
  const uniLogo = "logo.jpeg";

  return (
    <div className={styles["forms-container"]}>
      <form action="">
        <div className={styles["forms-containt-container"]}>
          <div className={styles["image-container"]}>
            <img src={uniLogo} alt="University" width={`100vw`} />
          </div>

          <FormsInput label="Nome Completo" type="text"/>

          <FormsInput label="E-mail" type="text"/>
          
          <FormsInput label="Senha" type="password"/>

          <FormsInput label="Confirmar Senha" type="password" />
          
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

const FormsInput = (props: {label: string, type: string}) => {
  
  const errorMessage = `this should be`;
  const isPatternValid = true;

  const id = useId();
  
  return (
    <div className={styles["forms-fields-container"]}>
      <label htmlFor={id}>{props.label}</label>
      <input type={props.type} id={id}></input>
      <div>{!isPatternValid && <span>{errorMessage}</span>}</div>
    </div>
  );
};

export default RegisterForms;

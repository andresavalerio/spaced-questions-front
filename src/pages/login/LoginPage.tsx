import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/header/Header";
import { useLoginStore } from "../../stores/login/LoginStore";
import styles from './LoginPage.module.css'



const LoginPage = () => {
  const { setUser } = useLoginStore((state) => state);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (

    <div className={styles['login-container']}>
      <div className={styles['logo-container']}>Spaced Questions</div>
      <div className={styles['login-area-container']}></div>
    </div>


    // <div className={styles['LoginPage-container']}>

    //   <Header content={"Spaced Questions"} showUserImage={false} />
    //   <h1>Digite o seu Usuário</h1>
    //   <input
    //     className={styles["LoginPage-input"]}
    //     type="text"
    //     value={name}
    //     placeholder="Nome de Usuário"
    //     onChange={(e) => setName(e.target.value)}
    //     onBlur={(e) => setUser(e.target.value)}
    //   />
    //   <input 
    //     className={styles["LoginPage-input"]}
    //     type="password"
    //     placeholder="Digite sua senha"
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <Link className={styles["LoginPage-forgotPassword"]} to="/forgot-password">
    //     Esqueci minha senha
    //   </Link>
    //   <div className={styles["LoginPage-buttons"]}>
    //     <Link to="/landingPage">
    //       <button className={styles["LoginPage-button"]}>Login</button>
    //     </Link>
    //     <Link to="/register">
    //       <button className={`${styles['LoginPage-button']} ${styles['LoginPage-button--register']}`}>Registrar</button>
    //     </Link>
    //   </div>
    // </div>
  );
};

export default LoginPage;

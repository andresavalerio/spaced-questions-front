import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/header/Header";
import { useLoginStore } from "../../stores/login/LoginStore";
import styles from "./LoginPage.module.css";
import LoginForms from "./LoginForms/LoginForms";
import Register from "../register/Register";
import ForgotPassword from "../forgot-password/ForgotPassword";

const LoginPage = () => {
  const { setUser } = useLoginStore((state) => state);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className={styles["login-container"]}>
      <div className={styles["logo-container"]}>Spaced Questions</div>
      <div className={styles["login-area-container"]}>
        <Routes>
          <Route index element={<LoginForms />}></Route>
          <Route path="register" element = {<Register />}></Route>
          <Route path="forgot-password" element={<ForgotPassword/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default LoginPage;

import { Route, Routes } from "react-router-dom";

import { useLoginStore } from "../../stores/login/LoginStore";
import styles from "./LoginPage.module.css";
import LoginForms from "./LoginForms/LoginForms";
import ForgotPassword from "../forgot-password/ForgotPassword";
import RegisterForms from "./RegisterForms/RegisterForms";

const LoginPage = () => {
  const { setUser } = useLoginStore((state) => state);

  return (
    <div className={styles["login-container"]}>
      <div className={styles["logo-container"]}>Spaced Questions</div>
      <div className={styles["login-area-container"]}>
        <Routes>
          <Route index element={<LoginForms />}></Route>
          <Route path="register" element={<RegisterForms />}></Route>
          <Route path="forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default LoginPage;

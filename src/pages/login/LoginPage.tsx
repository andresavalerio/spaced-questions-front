import { Outlet } from "react-router-dom";
import styles from "./LoginPage.module.css";
  const LoginPage = () => {
  
  return (
    <div className={styles["login-container"]}>
      <div className={styles["logo-container"]}>Spaced Questions</div>
      <div className={styles["login-area-container"]}>
        <Outlet/>
       {
       /* <Routes>
          <Route index element={<LoginForms />}></Route>
          <Route path="register" element = {<RegisterForms />}></Route>
          <Route path="forgot-password" element={<ForgotPassword/>}></Route>
        </Routes> */
        }
      </div>
    </div>
  );
};

export default LoginPage;

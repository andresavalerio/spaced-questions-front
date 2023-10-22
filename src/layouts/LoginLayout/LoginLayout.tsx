import { Navigate, Outlet } from "react-router-dom";
import styles from "./LoginLayout.module.css";
import { useUserProvider } from "providers/user/hooks/UserHooks";
import { isUserLogged } from "providers/user/utils/UserUtils";

const LoginLayout = () => {
  const { state } = useUserProvider();

  if (isUserLogged(state)) return <Navigate to={"/"} />;

  return (
    <div className={styles["login-container"]}>
      <div className={styles["logo-container"]}>Spaced Questions</div>
      <div className={styles["login-area-container"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;

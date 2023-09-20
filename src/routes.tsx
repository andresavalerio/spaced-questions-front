import { Navigate, RouteObject } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/login/LoginPage";
import LandingPage from "./pages/landing/LandingPage";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import LoginForms from "./pages/login/LoginForms/LoginForms";
import RegisterForms from "./pages/login/RegisterForms/RegisterForms";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
        children: [
          {
            path: "/",
            element:  <Navigate to="/login" />,
          },
          {
            path: "login",
            element: <LoginForms/>
          },
          {
            path: "register",
            element: <RegisterForms/>
          },
          {
            path: "forgot-password",
            element: <ForgotPassword/>
          },
        ],
      },
      {
        path: "/landingPage",
        element: <LandingPage />,
      },
    ],
  },
];

export default routes;

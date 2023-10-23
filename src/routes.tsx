import { RouteObject } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/landing/LandingPage";
import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import LoginLayout from "layouts/LoginLayout/LoginLayout";
import UserLayout from "layouts/UserLayout/UserLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <LoginLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegistrationPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },
        ],
      },
      {
        path: "/",
        element: <UserLayout />,
        children: [
          {
            path: "/",
            element: <LandingPage />,
          },
        ],
      },
    ],
  },
];

export default routes;

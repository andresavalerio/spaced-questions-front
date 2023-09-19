import { RouteObject } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/login/LoginPage";
import LandingPage from "./pages/landing/LandingPage";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import Register from "./pages/register/Register";

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
            path: "login",
          },
          {
            path: "register",
          },
          {
            path: "forgot-password",
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

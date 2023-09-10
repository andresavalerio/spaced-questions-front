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
      },
      {
        path: "/landingPage",
        element: <LandingPage />,
      },
      { 
        path: "/forgot-password",
        element: <ForgotPassword /> 
      },
      { 
        path: "/register",
        element: <Register /> 
      },
    ],
  },
];

export default routes;

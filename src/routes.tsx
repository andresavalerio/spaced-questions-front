import { Navigate, RouteObject } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/landing/LandingPage";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import DefaultTemplate from "./pages/DefaultTemplate/DefaultTemplate";
import LoginForms from "./pages/DefaultTemplate/LoginForms/LoginForms";
import RegisterForms from "./pages/DefaultTemplate/RegisterForms/RegisterForms";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DefaultTemplate />,
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

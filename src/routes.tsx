import { RouteObject } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/login/LoginPage";
import LandingPage from "./pages/landing/LandingPage";

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
    ],
  },
];

export default routes;

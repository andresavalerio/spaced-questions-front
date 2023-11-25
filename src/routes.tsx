import { Navigate, RouteObject, redirect } from "react-router-dom";
import App from "./App";
import LoginLayout from "layouts/LoginLayout/LoginLayout";
import UserLayout from "layouts/UserLayout/UserLayout";
import NotebooksPage from "./pages/Notebooks/NotebooksPage";
import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import CardsPage from "pages/cards/cardsPage";
import { cardLoader } from "providers/cards/loader/card-loader";
import LoadingPage from "pages/Loading/LoadingPage";



const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginLayout />,
        children: [
          {
            index: true,
            loader: () => {
              return redirect("/login");
            },
          },
          {
            path: "/login",
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
        path: "/user",
        element: <UserLayout />,
        children: [
          {
            index: true,
            loader: () => {
              return redirect("notebooks");
            },
          },
          {
            path: "notebooks",
            element: <NotebooksPage />,
          },
          {
            path: "cards",
            loader: cardLoader,
            element: <CardsPage />,
          },
        ],
      },
    ],
  },
];

export default routes;

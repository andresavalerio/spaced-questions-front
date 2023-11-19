import React from "react";
import ReactDOM from "react-dom/client";
import routes from "./routes.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { isDevelopment } from "config.ts";

const bootstrap = () => {
  const router = createBrowserRouter(routes);

  const root = ReactDOM.createRoot(document.getElementById("root")!);

  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

if (!isDevelopment) bootstrap();
else
  import("./serverWorker.ts").then(({ serverWorker }) => {
    serverWorker.start().then(() => {
      bootstrap();
    });
  });

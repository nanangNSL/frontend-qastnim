import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Landing from "./Pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/landing",
    element: <Landing/>,
  },
]);
export default router;

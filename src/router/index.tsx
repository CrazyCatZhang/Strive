import About from "@/views/About";
import Home from "@/views/Home";
import Login from "@/views/Login";
import User from "@/views/User";
import React from "react";
import { Navigate } from "react-router-dom";

const withLoadingComponent = (children: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
);

const routes = [
  {
    path: "/",
    element: <Navigate to="/about" />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/about", element: withLoadingComponent(<About />) },
      { path: "/user", element: withLoadingComponent(<User />) },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/about" />,
  },
];

export default routes;

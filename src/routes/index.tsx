import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routes";
import Permission from "./permission";

const rootRoutes = [
  {
    component: Permission,
    routes,
  },
];

const RouterMap = () => {
  return <Router basename="/">{renderRoutes(rootRoutes)}</Router>;
};

export default RouterMap;

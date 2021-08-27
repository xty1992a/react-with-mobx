import { HTMLAttributes } from "react";
import { RouteConfig } from "react-router-config";

declare module "react" {
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

declare namespace Route {
  export interface RouteItem extends RouteConfig {
    name: string;
    routes?: RouteItem[];
    meta: {
      funcCodes: string[];
      free?: boolean;
      [p: string]: any;
    };
  }
}
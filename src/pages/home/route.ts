import lazyLoad from "@/utils/lazy";
import { Route } from "@/typing/global";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

const Routes: Route.RouteItem[] = [
  {
    path: "/home",
    exact: false,
    name: "Home",
    title: "Home",
    component: (props: RouteConfigComponentProps) => {
      return renderRoutes(props.route?.routes);
    },
    meta: {
      funcCodes: ["124"],
      isMenu: true,
    },
    routes: [
      {
        path: "/home/list",
        exact: true,
        name: "HomeList",
        title: "HomeList",
        component: lazyLoad(() => import("../home/children/list")),
        meta: {
          funcCodes: ["123"],
          isMenu: true,
        },
      },
      {
        path: "/home/:homeId",
        exact: true,
        name: "HomeDetail",
        title: "HomeDetail",
        component: lazyLoad(() => import("../home/children/detail")),
        meta: {
          funcCodes: ["123"],
          isMenu: false,
        },
      },
    ],
  },
];

export default Routes;

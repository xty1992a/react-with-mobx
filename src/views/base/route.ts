import lazyLoad from "@/utils/lazy";
import { Route } from "@/typing/global";

const Routes: Route.RouteItemNullish[] = [
  {
    path: "/base",
    exact: true,
    name: "Base",
    title: "Base",
    component: lazyLoad(() => import("./index")),
    meta: {
      funcCodes: ["124"],
      isMenu: true,
      icon: "member",
    },
  },
];

export default Routes;

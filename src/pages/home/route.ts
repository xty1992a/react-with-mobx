import lazyLoad from "@/utils/lazy";
import { Route } from "@/typing/global";

const Routes: Route.RouteItemNullish[] = [
  {
    path: "/",
    exact: true,
    name: "Home",
    title: "Home",
    component: lazyLoad(() => import("./index")),
    meta: {
      funcCodes: ["124"],
      isMenu: true,
      icon: "member",
      index: 100,
    },
  },
];

export default Routes;

import lazyLoad from "@/utils/lazy";
import { Route } from "@/typing/global";

const Routes: Route.RouteItem[] = [
  {
    path: "/cms",
    exact: false,
    name: "CmsIndex",
    title: "CmsIndex",
    component: lazyLoad(() => import("./index")),
    meta: {
      funcCodes: ["123"],
    },
    routes: [
      {
        path: "/cms/user",
        exact: true,
        name: "CmsUser",
        title: "CmsUser",
        component: lazyLoad(() => import("./index/children/user")),
        meta: {
          funcCodes: ["123"],
        },
      },
    ],
  },
  {
    path: "/home/:homeId",
    exact: true,
    name: "CmsHome",
    title: "CmsHome",
    component: lazyLoad(() => import("./home")),
    meta: {
      funcCodes: ["124"],
    },
  },
];

export default Routes;

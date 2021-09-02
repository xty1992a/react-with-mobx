import lazyLoad from "@/utils/lazy";
import { Route } from "@/typing/global";
import Icon from "@/components/base/Icon";

const Routes: Route.RouteItem[] = [
  {
    path: "/cms",
    exact: false,
    name: "CmsIndex",
    title: "CmsIndex",
    component: lazyLoad(() => import("./index")),
    meta: {
      funcCodes: ["123"],
      isMenu: true,
      icon: <Icon icon="coupon" style={{ color: "red" }} />,
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
          isMenu: true,
        },
      },
      {
        path: "/cms/about",
        exact: true,
        name: "CmsAbout",
        title: "CmsAbout",
        component: lazyLoad(() => import("./index/children/about")),
        meta: {
          funcCodes: ["123"],
          isMenu: true,
        },
      },
    ],
  },
];

export default Routes;

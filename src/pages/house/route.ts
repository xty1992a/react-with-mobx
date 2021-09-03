import lazyLoad from "@/utils/lazy";
import { Route } from "@/typing/global";
import container from "@/components/base/RouteContainer";

const list: Route.RouteItemNullish = {
  path: "/house/list",
  exact: true,
  name: "HouseList",
  title: "HouseList",
  component: lazyLoad(() => import("./children/list")),
  meta: {
    funcCodes: ["123"],
    isMenu: true,
    breadcrumb: [
      {
        path: "/house/list",
        name: "HouseList",
        title: "HouseList",
        meta: { funcCodes: [] },
      },
    ],
  },
};

const detail: Route.RouteItemNullish = {
  path: "/house/list/:houseId",
  exact: true,
  name: "HouseDetail",
  title: "HouseDetail",
  component: lazyLoad(() => import("./children/detail")),
  meta: {
    breadcrumb: [
      list,
      {
        path: "/house/list/:houseId",
        name: "HouseDetail",
        title: "HouseDetail",
        meta: { funcCodes: [] },
      },
    ],
    funcCodes: ["123"],
    isMenu: false,
  },
};

const Routes: Route.RouteItemNullish[] = [
  {
    path: "/house",
    exact: false,
    name: "House",
    title: "House",
    component: container({ redirect: list.path }),
    meta: {
      funcCodes: ["124"],
      isMenu: true,
    },
    routes: [list, detail],
  },
];

export default Routes;

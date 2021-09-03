import lazyLoad from "@/utils/lazy";
import { Route } from "@/typing/global";

const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  return requireContext.keys().map(requireContext);
};

// 获取各目录下的路由
const req = require.context("../pages", true, /route\.tsx?$/);

const routeModules = requireAll(req).reduce((pre: any[], item: any) => {
  const module = item.default;
  const modules = Array.isArray(module) ? module : [module];
  return [...pre, ...modules];
}, []);

// 兜底路由放在最后,手动声明下
const notFound: Route.RouteItemNullish[] = [
  {
    path: "*",
    exact: false,
    component: lazyLoad(() => import("@/pages/404")),
    name: "NotFound",
    title: "NotFound",
    meta: {
      free: true,
      funcCodes: [],
    },
  },
];

const dftMeta: Route.CompleteRouteMeta = {
  funcCodes: [],
  free: false,
  isMenu: false,
  icon: "",
  index: 0,
  parentName: "root",
};

function sort(route: { routes?: Route.RouteItem[] }) {
  if (route.routes) {
    route.routes.forEach((it) => {
      sort(it);
      it.meta = {
        ...dftMeta,
        ...it.meta,
      };
    });
    route.routes.sort((a, b) => {
      return (b.meta.index || 0) - (a.meta.index || 0);
    });
  }
}

const routes = [...routeModules, ...notFound];

sort({ routes });

export default routes;

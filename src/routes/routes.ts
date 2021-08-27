import lazyLoad from "@/utils/lazy";
import { Route } from "@/typing/global";

const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  return requireContext.keys().map(requireContext);
};

// 获取各目录下的路由
const req = require.context("../pages", true, /route\.ts$/);

const routeModules = requireAll(req).reduce((pre: any[], item: any) => {
  const module = item.default;
  const modules = Array.isArray(module) ? module : [module];
  return [...pre, ...modules];
}, []);

// 兜底路由放在最后,手动声明下
const notFound: Route.RouteItem[] = [
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

const routes = [...routeModules, ...notFound];

export default routes;

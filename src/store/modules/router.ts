import { computed, makeAutoObservable } from "mobx";
import { Route } from "@/typing/global";
import { uniq } from "@/utils";

type RouteItem = Route.RouteItem;

function walk(
  routes: RouteItem[],
  parent: RouteItem | null,
  callback: (route: RouteItem, parent: RouteItem | null) => void
) {
  routes?.forEach((it) => {
    it.routes && walk(it.routes, it, callback);
    callback(it, parent);
  });
}

type Item = {
  name: string;
  title: string;
  path: string;
  children?: Item[];
};

export class Router {
  rootRoute: RouteItem | null = null;

  @computed
  get routes() {
    return this.rootRoute?.routes ?? [];
  }

  // 展平的route列表
  @computed
  get platRoutes() {
    const result: RouteItem[] = [];

    walk(this.routes, null, (route, parent) => {
      result.push({
        ...route,
        meta: { ...route.meta, parentName: parent?.name ?? "root" },
      });
    });

    if (process.env.NODE_ENV === "development") {
      const names = result.map((it) => it.name);

      if (uniq(names).length !== names.length) {
        console.error("请修改重复的路由name");
      }
    }

    return result;
  }

  setRootRoute(route: RouteItem) {
    this.rootRoute = route;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default Router;

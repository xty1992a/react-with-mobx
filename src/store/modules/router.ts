import { makeAutoObservable, computed, flow } from "mobx";
import { Route } from "@/typing/global";

type RouteItem = Route.RouteItem;

function walk(routes: RouteItem[], callback: (route: RouteItem) => void) {
  routes?.forEach((it) => {
    it.routes && walk(it.routes, callback);
    callback(it);
  });
}

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

    walk(this.routes, (route) => {
      result.push(route);
    });

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

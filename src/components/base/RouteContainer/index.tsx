import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { useEffect } from "react";

interface Options {
  redirect?: string; // 当指定重定向时,命中当前路由的,将被重定向
}

/*
 * 路由容器
 * */

export default function container(options: Options) {
  const { redirect = "" } = options;

  if (redirect.includes(":")) {
    console.error("redirect不能指定动态路由!");
  }

  return function RouterContainer(props: RouteConfigComponentProps) {
    const { location, history, match, route } = props;

    useEffect(() => {
      if (!route) return;
      if (!redirect) return;
      if (redirect.includes(":")) return;
      // 如果当前路径完全匹配该父路由,重定向到指定路径
      if (location.pathname === route.path) {
        history.replace(redirect);
      }
    }, [history, route, location.pathname]);

    return renderRoutes(route?.routes);
  };
}

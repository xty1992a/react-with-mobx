import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { matchPath } from "react-router";
import React, { useEffect, useMemo } from "react";
import { useStores } from "@/hooks";
import { Observer } from "mobx-react-lite";
import { Spin } from "antd";
import { Route } from "@/typing/global";
import { shouldPass } from "@/utils";
import Layout from "@/components/base/Layout";
type RouteItem = Route.RouteItem;

const Root = (props: RouteConfigComponentProps<any>) => {
  const { route, location } = props;
  const { user, router } = useStores();

  useEffect(() => {
    if (!route) return;
    router.setRootRoute(route as RouteItem);
  }, [route, router]);

  // 获取用户信息,决定权限
  useEffect(() => {
    user.fetchUser();
  }, [user]);

  const render = () => {
    if (user.loading) return null;

    if (!route) return <div>oops something went wrong !</div>;

    const match = router.platRoutes.find((route) =>
      matchPath(location.pathname, route)
    );

    if (!match) return <div>oops something went wrong !</div>;

    const pass =
      match.meta.free || shouldPass(match.meta.funcCodes, user.funcCodes);

    if (!pass) return <div>暂无权限</div>;

    return renderRoutes(route.routes);
  };

  return (
    <Layout>
      <Observer>{render}</Observer>
    </Layout>
  );
};

export default Root;

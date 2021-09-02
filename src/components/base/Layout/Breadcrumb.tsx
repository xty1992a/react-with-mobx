import React, { FC, useMemo } from "react";
import css from "styled-jsx/css";
import { Breadcrumb as AntBread } from "antd";
import { useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { Route } from "@/typing/global";
import { useStores } from "@/hooks";
import { observer } from "mobx-react-lite";
type RouteItem = Route.RouteItem;

const styles = css`
  .breadcrumb {
  }
`;

interface Props {
  [p: string]: any;
}

function includeRoute(routes: RouteItem[], route: { path: string }) {
  for (const item of routes) {
    if (item.path === route.path) return item;
    if (item.routes && includeRoute(item.routes, route)) return item;
  }
  return null;
}

function trace(topLevel: RouteItem, target: { path: string }): RouteItem[] {
  if (topLevel.path === target.path)
    return [{ ...topLevel, routes: undefined }];
  if (topLevel.routes) {
    const children = topLevel.routes.reduce(
      (pre: RouteItem[], it) => [...pre, ...trace(it, target)],
      []
    );
    return [{ ...topLevel, routes: undefined }, ...children];
  }
  return [];
}

const Breadcrumb: FC<Props> = (props) => {
  const location = useLocation();
  const match = useRouteMatch(location.pathname);
  const { router } = useStores();

  const matchTrace = useMemo(() => {
    if (!router.rootRoute) {
      console.log("no route");
      return [];
    }
    if (!match) return [];
    const topLevel = includeRoute(
      router.rootRoute?.routes as RouteItem[],
      match
    );
    if (!topLevel) return [];

    return trace(topLevel, match);
  }, [router.rootRoute, match]);

  return (
    <div className="breadcrumb">
      <AntBread>
        {matchTrace.map((item) => (
          <AntBread.Item key={item.path as string}>
            <Link to={item.path as string}>{item.title}</Link>
          </AntBread.Item>
        ))}
      </AntBread>
      <style jsx>{styles}</style>
    </div>
  );
};

export default observer(Breadcrumb);

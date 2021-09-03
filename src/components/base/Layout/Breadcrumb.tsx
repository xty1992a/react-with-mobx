import React, { FC, useMemo } from "react";
import css from "styled-jsx/css";
import { Breadcrumb as AntBread } from "antd";
import { useLocation, useRouteMatch, matchPath } from "react-router";
import { Link } from "react-router-dom";
import { Route } from "@/typing/global";
import { useStores } from "@/hooks";
import { observer } from "mobx-react-lite";
type RouteItemNullish = Route.RouteItemNullish;
type RouteItem = Route.RouteItem;

const styles = css`
  .breadcrumb {
  }
`;

interface Props {
  [p: string]: any;
}

function includeRoute(routes: RouteItem[], route: { name: string }) {
  for (const item of routes) {
    if (item.name === route.name) return item;
    if (item.routes && includeRoute(item.routes, route)) return item;
  }
  return null;
}

function trace(topLevel: RouteItem, target: { name: string }): RouteItem[] {
  if (topLevel.name === target.name)
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
  const { router } = useStores();
  const match = router.platRoutes.find((route) =>
    matchPath(location.pathname, route)
  );

  const matchTrace: RouteItemNullish[] = (() => {
    if (!router.rootRoute) {
      console.log("no route");
      return [];
    }
    if (!match) {
      console.log("no match");
      return [];
    }

    if (match.meta.breadcrumb) {
      return match.meta.breadcrumb;
    }

    console.log("match", match);
    const topLevel = includeRoute(
      router.rootRoute?.routes as RouteItem[],
      match as any
    );
    if (!topLevel) return [];

    return trace(topLevel, { name: match.name });
  })();

  console.log(matchTrace);

  return (
    <div className="breadcrumb">
      <AntBread>
        {router.rootRoute && (
          <AntBread.Item key="root">
            <Link to={router.rootRoute.path}>{router.rootRoute.title}</Link>
          </AntBread.Item>
        )}
        {matchTrace.map((item, index) => (
          <AntBread.Item key={item.path}>
            {index === matchTrace.length - 1 ? (
              <span>{item.title}</span>
            ) : (
              <Link to={item.path}>{item.title}</Link>
            )}
          </AntBread.Item>
        ))}
      </AntBread>
      <style jsx>{styles}</style>
    </div>
  );
};

export default observer(Breadcrumb);

import React, { FC } from "react";
import { Button } from "antd";
import { useStores } from "@/hooks";
import { Observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import css from "styled-jsx/css";
import * as ui from "@/services/ui";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { observer } from "mobx-react-lite";
import RouteTabs from "@/components/base/RouteTabs";
import { Route } from "@/typing/global";
import { matchPath, useLocation } from "react-router";
import container from "@/components/base/RouteContainer";
type RouteItem = Route.RouteItem;

// region style
const style = css`
  .box {
    height: 100px;
    width: 100px;
    background-color: $text-color-active;
    p {
      font-size: 24px;
    }
  }

  .avatar {
    width: 100px;
    height: 100px;
    img {
      object-fit: cover;
    }
  }
`;
// endregion

const Cms: FC<RouteConfigComponentProps> = (props) => {
  const { route } = props;
  const location = useLocation();

  const routes = (route?.routes ?? []) as RouteItem[];
  const match = routes.find((route) => matchPath(location.pathname, route));

  return (
    <div className="page-cms">
      <RouteTabs routes={routes} match={match} />
      <section>{container({ redirect: "/cms/user" })(props)}</section>
      <style jsx>{style}</style>
    </div>
  );
};

export default observer(Cms);

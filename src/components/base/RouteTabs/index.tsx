import React, { FC } from "react";
import css from "styled-jsx/css";
import { Route } from "@/typing/global";
type RouteItem = Route.RouteItem;

const styles = css`
  .route-tabs {
  }
`;

interface Props {
  routes: RouteItem[];
  match: RouteItem;
  [p: string]: any;
}

const RouteTabs: FC<Props> = (props) => {
  return (
    <div className="route-tabs">
      <style jsx>{styles}</style>
    </div>
  );
};

export default RouteTabs;

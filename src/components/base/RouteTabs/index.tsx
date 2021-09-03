import React, { FC } from "react";
import css from "styled-jsx/css";
import { Route } from "@/typing/global";
import { Menu } from "antd";
import { useHistory } from "react-router";
type RouteItem = Route.RouteItem;

const styles = css`
  .route-tabs {
  }
`;

interface Props {
  routes: RouteItem[];
  match?: RouteItem;
  [p: string]: any;
}

const RouteTabs: FC<Props> = (props) => {
  const { routes, match } = props;
  const history = useHistory();

  return (
    <div className="route-tabs">
      <Menu
        mode="horizontal"
        selectedKeys={match ? [match.path] : []}
        onClick={(e) => {
          history.push(e.key);
        }}
      >
        {routes.map((it) => (
          <Menu.Item key={it.path}>{it.title}</Menu.Item>
        ))}
      </Menu>

      <style jsx>{styles}</style>
    </div>
  );
};

export default RouteTabs;

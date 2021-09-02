import React, { FC, ReactNode, useEffect, useState } from "react";
import css from "styled-jsx/css";
import { Menu } from "antd";
import { useStores } from "@/hooks";
import { observer } from "mobx-react-lite";
import { Route } from "@/typing/global";
import { useLocation, useHistory, matchPath } from "react-router";
import Icon from "@/components/base/Icon";
type RouteItem = Route.RouteItem;

const { SubMenu, Item, ItemGroup } = Menu;
const styles = css`
  .route-menu {
  }
`;

interface Props {
  nested: boolean;
  [p: string]: any;
}

const trace = (name: string, list: RouteItem[]) => {
  let _name = name;
  const result: string[] = [];

  while (_name !== "root") {
    const item = list.find((it) => it.name === _name);
    if (!item) break;
    _name = item.meta.parentName as string;
    result.unshift(item.path as string);
  }

  return result;
};

const getMenu = (item: RouteItem) => item.meta.isMenu;

const icon = (icon?: ReactNode) => {
  if (!icon) return null;
  if (typeof icon === "string") return <Icon icon={icon} />;
  return icon;
};

const renderRoute = (route: RouteItem) => {
  if (route.routes?.length) {
    return (
      <SubMenu
        icon={icon(route.meta.icon)}
        key={route.path as string}
        title={route.title}
      >
        {route.routes.filter(getMenu).map(renderRoute)}
      </SubMenu>
    );
  }

  return (
    <Item icon={icon(route.meta.icon)} key={route.path as string}>
      {route.title}
    </Item>
  );
};
const RouteMenu: FC<Props> = (props) => {
  const { nested } = props;
  const { router } = useStores();
  const history = useHistory();
  const location = useLocation();
  const tops = (router.rootRoute?.routes ?? []).filter(getMenu);
  const [open, setOpen] = useState<string[]>([]);

  const item = router.platRoutes.find((it) => matchPath(location.pathname, it));
  const keys = item ? [item.path as string] : [];

  useEffect(() => {
    const openKeys = item ? trace(item.name, router.platRoutes) : [];
    const list = openKeys.slice(0, openKeys.length - 1);
    setOpen(list);

    console.log(
      "openKeys",
      router.platRoutes,
      item ? item.name : "no match",
      list
    );
  }, [router, item, location.pathname]);

  return (
    <div className="route-menu">
      <Menu
        mode="inline"
        selectedKeys={keys}
        openKeys={open}
        inlineCollapsed={nested}
        onOpenChange={(e) => {
          setOpen(e as string[]);
        }}
        onClick={(e) => {
          history.push(e.key);
        }}
      >
        {tops.map(renderRoute)}
      </Menu>

      <style jsx>{styles}</style>
    </div>
  );
};

export default observer(RouteMenu);

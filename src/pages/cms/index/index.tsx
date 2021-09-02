import React, { FC } from "react";
import { Button } from "antd";
import { useStores } from "@/hooks";
import { Observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import css from "styled-jsx/css";
import * as ui from "@/services/ui";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { observer } from "mobx-react-lite";

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

  return (
    <div className="page-cms">
      <section>{renderRoutes(route?.routes)}</section>
      <style jsx>{style}</style>
    </div>
  );
};

export default observer(Cms);

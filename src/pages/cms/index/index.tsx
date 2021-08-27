import React, { FC, useEffect } from "react";
import { Button } from "antd";
import { useStores } from "@/hooks";
import { Observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import css from "styled-jsx/css";
import * as ui from "@/services/ui";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { observer } from "mobx-react";

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
  const { app } = useStores();

  return (
    <Observer>
      {() => (
        <div className="page-cms">
          <div className="box">
            <p>hello</p>
          </div>
          <Button
            onClick={() => {
              app.setCount();
            }}
          >
            {app.count}
          </Button>

          <Button
            loading={app.loading}
            onClick={async () => {
              const data = await app.asyncSetCount();
              console.log(data);
            }}
          >
            异步
            {app.count}
          </Button>

          <Link to="/cms/home">home</Link>

          <div>
            <Button
              onClick={() =>
                ui.loading({ mask: false, text: "加载中...", duration: 1000 })
              }
            >
              loading
            </Button>
          </div>

          <section>{renderRoutes(route?.routes)}</section>

          <style jsx>{style}</style>
        </div>
      )}
    </Observer>
  );
};

export default observer(Cms);

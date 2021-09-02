import React, { FC } from "react";
import css from "styled-jsx/css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import * as ui from "@/services/ui";
import { useStores } from "@/hooks";
import { observer } from "mobx-react-lite";

const styles = css`
  .about {
  }
`;

interface Props {
  [p: string]: any;
}

const About: FC<Props> = (props) => {
  const { app } = useStores();

  return (
    <div className="about">
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

      <style jsx>{styles}</style>
    </div>
  );
};

export default observer(About);

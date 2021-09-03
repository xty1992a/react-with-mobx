import React, { FC } from "react";
import css from "styled-jsx/css";
import { Button } from "antd";

const styles = css`
  .view {
    .btn-bar {
      padding: 10px 0;
    }
    .simulator {
      border: 1px solid #e5e5e5;
      min-height: 667px;
      width: 375px;
    }
  }
`;

interface Props {
  [p: string]: any;
}

const View: FC<Props> = (props) => {
  return (
    <div className="view">
      <div className="btn-bar">
        <Button>容器</Button>
      </div>
      <div className="simulator"></div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default View;

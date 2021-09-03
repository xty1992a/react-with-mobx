import React, { FC } from "react";
import css from "styled-jsx/css";
import { View, Editor } from "./children";

const styles = css`
  .base {
    padding: 16px;
    border: 1px solid #e5e5e5;
    margin-right: 10px;
    &-content {
      min-height: 50vh;
      display: grid;
      grid-template-columns: 400px 50%;
    }
  }
`;

interface Props {
  [p: string]: any;
}

const Base: FC<Props> = (props) => {
  return (
    <div className="base">
      <div className="base-content">
        <View />
        <Editor />
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default Base;

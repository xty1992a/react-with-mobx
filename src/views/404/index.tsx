import React, { FC } from "react";
import Icon from "@/components/base/Icon";
import css from "styled-jsx/css";

const styles = css`
  .not-found {
    min-height: 100vh;
    overflow: auto;

    .box {
      font-size: 18px;
      padding-top: 20vh;
      text-align: center;
      .icon {
        line-height: 1;
        font-size: 140px;
        svg {
        }
      }
    }
  }
`;

interface Props {
  [p: string]: any;
}

const NotFound: FC<Props> = (props) => {
  return (
    <div className="not-found">
      <div className="box">
        <div className="icon">
          <Icon icon="logo" />
        </div>
        <div className="message">not found</div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

export default NotFound;

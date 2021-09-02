import React, { FC, useMemo } from "react";
import css from "styled-jsx/css";
import { observer, useLocalObservable, Observer } from "mobx-react-lite";
import Icon from "@/components/base/Icon";
import RouteMenu from "./RouteMenu";
import classnames from "classnames";

const styles = css`
  .aside {
    &_nested {
      .top-bar {
        justify-content: center;
        .logo-bar {
          display: none;
        }
        .toggle {
          transform: rotate(180deg);
        }
      }
    }
    .top-bar {
      padding: 10px 0;
      border-bottom: 1px solid #e5e5e5;
      margin: 0 16px 16px;

      .logo-bar {
        height: 60px;
        .icon {
          font-size: 40px;
        }
        .slogan {
          h3 {
            margin-bottom: 10px;
          }
          p {
            font-size: 12px;
            color: #999;
          }
        }
      }

      .toggle {
        cursor: pointer;
        font-size: 18px;
        transition: 0.3s;
      }
    }
  }
`;

interface Props {
  nested?: boolean;
  onToggle?: () => void;
  [p: string]: any;
}

const nope = () => {};

const Aside: FC<Props> = (props) => {
  const { nested = false, onToggle = nope } = props;

  return (
    <div
      className={classnames("aside", {
        aside_nested: nested,
      })}
    >
      <div className="top-bar between-box" onClick={onToggle}>
        <div className="logo-bar between-box">
          <div className="icon">
            <Icon icon="logo" />
          </div>
          <div className="full-box slogan">
            <h3>内容中心</h3>
            <p>您的内容管理中心</p>
          </div>
        </div>

        <div className="toggle">
          <Icon icon="arrow_left" />
        </div>
      </div>
      <div className="menus">
        <RouteMenu nested={nested} />
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

export default observer(Aside);

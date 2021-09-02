import React, { FC, useState } from "react";
import css from "styled-jsx/css";
import Breadcrumb from "./Breadcrumb";
import Aside from "./Aside";
import classnames from "classnames";

// region styles
const styles = css`
  .layout {
    display: flex;
    min-height: 100vh;
    &_nest {
      .layout_side {
        width: 80px;
      }
    }

    &_side {
      flex-shrink: 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
      position: relative;
      z-index: 1;
      background-color: #fff;
      width: 200px;
      transition: 0.2s;
    }
    &_main {
      flex: 1;
    }
    &_header {
      height: 60px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: center;
      padding: 10px;
    }
    &_body {
      padding-left: 10px;
      padding-top: 10px;
    }
  }
`;
// endregion

interface Props {
  [p: string]: any;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;

  const [nested, setNested] = useState(false);

  return (
    <div
      className={classnames("layout", {
        layout_nest: nested,
      })}
    >
      <aside className="layout_side">
        <Aside nested={nested} onToggle={() => setNested((old) => !old)} />
      </aside>

      <main className="layout_main">
        <header className="layout_header">
          <Breadcrumb />
        </header>
        <section className="layout_body">{children}</section>
      </main>
      <style jsx>{styles}</style>
    </div>
  );
};

export default Layout;

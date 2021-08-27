import React, { FC, useEffect } from "react";
import css from "styled-jsx/css";
import Breadcrumb from "./Breadcrumb";

const styles = css`
  .layout {
    display: grid;
    grid-template-columns: 160px 1fr;
    min-height: 100vh;
    &_side {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
      position: relative;
      z-index: 1;
      background-color: #fff;
    }
    &_main {
    }
    &_header {
      height: 60px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
    }
    &_body {
      padding-left: 10px;
      padding-top: 10px;
    }
  }
`;

interface Props {
  [p: string]: any;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="layout">
      <aside className="layout_side"></aside>

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

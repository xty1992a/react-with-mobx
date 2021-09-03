import React, { FC } from "react";
import css from "styled-jsx/css";

const styles = css`
  .home {
  }
`;

interface Props {
  [p: string]: any;
}

const Home: FC<Props> = (props) => {
  return (
    <div className="home">
      <p>this is home page</p>
      <style jsx>{styles}</style>
    </div>
  );
};

export default Home;

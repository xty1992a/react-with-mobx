import React, { FC } from "react";
import css from "styled-jsx/css";

const styles = css`
  .home-detail {
    caret-color: transparent;
  }
`;

interface Props {
  [p: string]: any;
}

const HomeDetail: FC<Props> = (props) => {
  const { route, match } = props;

  return (
    <div className="home-detail">
      <span>当前是</span>
      <span>{match.params.houseId}</span>

      <style jsx>{styles}</style>
    </div>
  );
};

export default HomeDetail;

import React, { FC } from "react";
import css from "styled-jsx/css";
import { Button } from "antd";
import Auth from "@/components/base/Auth";
import { useStores } from "@/hooks";
import { observer } from "mobx-react-lite";

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
  const { app } = useStores();

  return (
    <div className="home-detail">
      <span>当前是</span>
      <span>{match.params.houseId}</span>

      <p>hello</p>
      <span>afd</span>
      <Button onClick={app.setCount}>{app.count}</Button>
      {/*不要这样做*/}
      <Button onClick={() => (app.count += 1)}>store之外的更改</Button>
      <Auth required={["125"]} fallback>
        <Button>125权限才能看到</Button>
      </Auth>

      <style jsx>{styles}</style>
    </div>
  );
};

export default observer(HomeDetail);

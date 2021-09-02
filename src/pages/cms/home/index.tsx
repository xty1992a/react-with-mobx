import React, { FC } from "react";
import { Button } from "antd";
import App from "@/store/modules/app";
import { Link } from "react-router-dom";
import Index from "@/components/base/Auth";
import { useStores } from "@/hooks";
import { observer } from "mobx-react-lite";

interface Props {
  app: App;
}

const Home: FC = (props) => {
  const { app } = useStores();

  return (
    <div>
      <p>hello</p>
      <span>afd</span>
      <Button onClick={app.setCount}>{app.count}</Button>
      {/*不要这样做*/}
      <Button onClick={() => (app.count += 1)}>store之外的更改</Button>
      <Index required={["125"]} fallback>
        <Button>125权限才能看到</Button>
      </Index>
      <p>
        <Link to="/cms">index</Link>
      </p>
    </div>
  );
};

export default observer(Home);

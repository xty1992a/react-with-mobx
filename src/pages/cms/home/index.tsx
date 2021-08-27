import React from "react";
import { inject, observer } from "mobx-react";
import { Button } from "antd";
import App from "@/store/modules/app";
import { Link } from "react-router-dom";
import Index from "@/components/base/Auth";

interface Props {
  app: App;
}

// class 组件使用inject引入store
@inject("app")
@observer
class Home extends React.Component<Props, any> {
  get app() {
    return this.props.app;
  }

  render() {
    const app = this.app;

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
  }
}

export default Home;

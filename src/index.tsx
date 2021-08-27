import React from "react";
import { render } from "react-dom";
import App from "./app";

import { Provider } from "mobx-react";
import rootStore from "./store";

render(
  // 类组件使用mobx数据时,需要根组件provide
  <Provider {...rootStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);

import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import RouterMap from "./routes";
import "@/icons";
import "./styles/globals.scss";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ConfigProvider locale={zhCN}>
        <RouterMap />
      </ConfigProvider>
    </React.Fragment>
  );
};

export default App;

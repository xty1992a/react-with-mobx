import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import RouterMap from "./routes";
import "@/icons";
import "./styles/globals.scss";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ConfigProvider locale={zhCN}>
        <RouterMap />
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default App;

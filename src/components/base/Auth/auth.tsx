import React, { FC, ReactNode } from "react";
import { shouldPass } from "@/utils";

export interface Props {
  required: string[]; // 组件要求的权限集
  funcCodes: string[]; // 用户所拥有的权限集
  fallback?: ReactNode;
}

const Fallback = () => {
  return <span>暂无权限</span>;
};

const AuthBase: FC<Props> = (props) => {
  const { required, funcCodes, fallback = Fallback(), children } = props;
  const pass = shouldPass(required, funcCodes);
  return <>{pass ? children : fallback}</>;
};

export default AuthBase;

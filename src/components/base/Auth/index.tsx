import React, { FC } from "react";
import AuthBase, { Props as AuthProps } from "./auth";
import { useStores } from "@/hooks";

export type Props = Omit<AuthProps, "funcCodes">;

const Auth: FC<Props> = (props) => {
  const { user } = useStores();
  return <AuthBase {...props} funcCodes={user.funcCodes} />;
};

export default Auth;

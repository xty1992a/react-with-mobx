import request from "./request";

export const getUserInfo = () =>
  request("/user/info", {
    params: {},
  });

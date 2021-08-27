import { Middleware } from "../type";
import {
  objectSignWithTimestampStable,
  querySignWithTimestamp,
  stringify,
  transformObjectPropertyToJSON,
} from "@yunke/aicst-client-check";
import { AxiosRequestConfig } from "axios";
import qs from "querystring";

function sign(config: AxiosRequestConfig) {
  const { method, url = "", data = {}, params = {}, headers = {} } = config;

  const result: AxiosRequestConfig = { ...config };
  let token = "";

  if (method?.toUpperCase() === "POST") {
    const { body, signing } = objectSignWithTimestampStable(data, {});
    result.data = body;
    token = signing;
  } else if (method?.toUpperCase() === "GET") {
    const [path, param = ""] = url.split("?");
    const query = {
      ...params,
      ...qs.parse(param),
    };
    const ret = querySignWithTimestamp(
      stringify(transformObjectPropertyToJSON(query))
    );
    console.log(ret);
    token = ret.signing;
    result.params = qs.parse(ret.query);
    result.url = path;
  }

  result.headers = {
    ...headers,
    // ['Autho-Token']: token,
  };

  return result;
}

export const before: Middleware[] = [
  {
    fulfilled: (config: AxiosRequestConfig) => {
      return sign(config);
    },
    reject: (err: any) => Promise.reject(err),
  },
];

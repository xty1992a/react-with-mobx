import { createTraceId } from "@/utils";
import { AxiosRequestConfig } from "axios";
import { Middleware } from "../type";

const liveTraceId = `live${createTraceId()}`;

export const before: Middleware[] = [
  {
    fulfilled: (config: AxiosRequestConfig) => {
      config.headers = {
        ...(config.headers || {}),
        "Live-Trace-Id": liveTraceId,
        "Trace-Id": createTraceId(),
        // ['version']: '0.0.1',
      };

      return config;
    },
    reject: (err: any) => Promise.reject(err),
  },
];

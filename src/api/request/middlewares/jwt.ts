import { AxiosRequestConfig } from 'axios';
import { Middleware } from '../type';

const token = 'hello jwt';

export const before: Middleware[] = [
  {
    fulfilled: (config: AxiosRequestConfig) => {
      config.headers = {
        ...(config.headers || {}),
        // Authorization: `Bearer ${token}`,
      };

      return config;
    },
    reject: (err: any) => Promise.reject(err),
  },
];

export const after: Middleware[] = [
  {
    fulfilled: (response: any) => {
      // config.headers = {
      //   ...(config.headers || {}),
      //   ['Live-Trace-Id']: liveTraceId,
      //   ['Trace-Id']: createTraceId(),
      //   ['version']: '0.0.1',
      // };

      return response;
    },
    reject: (err: any) => Promise.reject(err),
  },
];

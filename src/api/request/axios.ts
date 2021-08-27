import axios, { AxiosRequestConfig } from "axios";
import { merge } from "@/utils";
import * as jwt from "./middlewares/jwt";
import * as sign from "./middlewares/sign";
import * as trace from "./middlewares/trace";
import type { RequestOptions, Result } from "./type";

// region 中间件
// 新增中间件需要在此引入
const before = [...trace.before, ...jwt.before, ...sign.before];

const after = [...jwt.after];

// endregion

// region data
const log = (...args: any[]) =>
  console.log(
    "%c[request]",
    "color: #34495e;background: #41b883;font-weight: bold;padding: 0 10px;line-height: 1.5",
    ...args
  );
/** 全局配置 */
const globalOptions: RequestOptions = {
  loading: true,
  toast: true,
  isSuccess: (res) => res.success,
  getMessage: (res) => res.message || res.msg || (res.error || [])[0] || "",
  Toast: {
    loading: () => console.log("加载中..."),
    toast: () => console.log("加载中..."),
    clear: () => void 0,
  },
  before,
  after,
};
/** axios全局配置 */
const globalConfig: AxiosRequestConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

// endregion

// 提供一个方法创建含有自定义配置的request方法
export const createAxiosInstance = (
  dftConfig: AxiosRequestConfig = {},
  dftOptions: Partial<RequestOptions> = {}
) => {
  dftConfig = merge(globalConfig, dftConfig);
  dftOptions = merge(globalOptions, dftOptions);
  const axiosInstance = axios.create();

  dftOptions.before?.forEach((it) => {
    axiosInstance.interceptors.request.use(it.fulfilled, it.reject);
  });

  function request<Data = any>(
    url: string,
    config: AxiosRequestConfig = {},
    options: Partial<Omit<RequestOptions, "before" | "after">> = {}
  ): Promise<Result<Data>> {
    config = merge(dftConfig, { ...(config || {}), url });
    const opt = merge<RequestOptions>(dftOptions, options || {});
    if (opt.loading) {
      opt.Toast.loading();
    }
    return new Promise(async (resolve) => {
      try {
        const result = await axiosInstance(config);
        // log('result', result);
        const response = result.data;
        const success = opt.isSuccess(response) ?? false;
        const message = opt.getMessage(response) ?? "";

        if (!success && opt.toast) {
          opt.Toast.toast(message);
        }

        resolve({
          success,
          message: success ? message : message || "业务异常",
          data: response.data || null,
          response: success ? null : result,
        });
      } catch (error) {
        log("error: ", error);
        resolve({
          success: false,
          message: "网络异常",
          data: error,
          error: [error],
        });
        if (opt.toast) {
          opt.loading && opt.Toast.clear();
          return opt.Toast.toast(error.message || "网络异常");
        }
      }
      if (opt.loading) {
        opt.Toast.clear();
      }
    });
  }

  return request;
};

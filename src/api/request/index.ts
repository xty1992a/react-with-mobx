import { toast } from "@/services/ui";
import { merge } from "@/utils";
import { createAxiosInstance } from "./axios";
import type { AxiosRequestConfig } from "axios";
import type { RequestOptions } from "./type";

const dftOptions: Partial<RequestOptions> = {
  Toast: {
    ...toast,
    loading: toast.loading.bind(null, "加载中..."),
  },
  before: [],
  isSuccess: (res) => {
    return res.code === 0;
  },
};

// 套娃
export function init(
  config: AxiosRequestConfig = {},
  options: Partial<RequestOptions> = {}
) {
  return createAxiosInstance(config, merge(options, dftOptions));
}

const request = init({
  baseURL: "/api",
  headers: {},
});
export default request;

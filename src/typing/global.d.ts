import { HTMLAttributes, ReactNode } from "react";
import { RouteConfig } from "react-router-config";

type PickIn<T, K extends keyof T> = {
  [P in K]?: T[P];
};

// 将第一个泛型中,第二个泛型指定的key值变为可选
type Nullish<T, K extends keyof T> = Omit<T, K> & PickIn<T, K>;

type Intersection<T, U> = {
  [P in Extract<keyof T, keyof U>]: P extends keyof U ? T[P] : never;
};
declare module "react" {
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

type NullishProps =
  | "free"
  | "isMenu"
  | "icon"
  | "index"
  | "parentName"
  | "breadcrumb";

declare namespace Route {
  export type RouteMeta = Nullish<CompleteRouteMeta, NullishProps> & {
    [p: string]: any;
  };

  export interface CompleteRouteMeta {
    funcCodes: string[]; // 权限码
    free: boolean; // 传true时无视权限码,直接通过
    isMenu: boolean; // 是否是侧边栏导航,当一个父路由仅有一个menu子路由时,将替换为子路由
    icon: ReactNode; // 图标,可以是字符串,使用icons下同名图标,也可以自定义
    index: number; // 路由排序索引,越大越靠前,不传或相等时为字典序
    parentName: string; // 自动处理,无需配置
    breadcrumb?: RouteItemNullish[]; // 当实际层级与路由层级不符时,被命中的路由可以自定义导航
    // 如list与detail同属house,命中detail时,理想的层级是,list/detail,自动生成的却是house/detail
  }

  export interface RouteItem extends RouteConfig {
    path: string;
    name: string;
    routes?: RouteItem[];
    meta: CompleteRouteMeta;
  }

  export interface RouteItemNullish extends RouteConfig {
    path: string;
    name: string;
    routes?: RouteItemNullish[];
    meta: RouteMeta;
  }
}

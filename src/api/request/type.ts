export interface Response {
  success: boolean;
  message: string;
  [key: string]: any;
}

export interface Result<T = any> {
  success: boolean;
  message: string;
  data: T;
  error?: any[];
  response?: any;
}

export interface RequestOptions {
  loading: boolean;
  toast: boolean;
  isSuccess: (res: Response) => boolean;
  getMessage: (res: Response) => string;
  Toast: {
    loading: Function;
    toast: Function;
    clear: Function;
  };
  before: Middleware[];
  after: Middleware[];
}

export type HandleOk<V> = (value: V) => V | Promise<V>;
export type HandleErr = (err: any) => any;

export type Middleware = { fulfilled: HandleOk<any>; reject: HandleErr };

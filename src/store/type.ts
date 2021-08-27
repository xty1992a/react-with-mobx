import type App from "@/store/modules/app";
import type User from "@/store/modules/user";
import type Router from "@/store/modules/router";

export interface RootStore {
  app: App;
  user: User;
  router: Router;
}

// export type SortBy<I, A extends (keyof I[])> =

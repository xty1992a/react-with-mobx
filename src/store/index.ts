import type { RootStore } from "./type";
import App from "./modules/app";
import User from "./modules/user";
import Router from "./modules/router";
import { configure } from "mobx";
configure({ enforceActions: "observed", useProxies: "never" });

console.log();

const rootStore: RootStore = {
  app: new App(),
  user: new User(),
  router: new Router(),
};

export default rootStore;

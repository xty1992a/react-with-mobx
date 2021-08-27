import { makeAutoObservable, computed, flow } from "mobx";
import * as API from "@/api/user";

interface UserInfo {
  funcCodes: string[];
  name: string;
  avatar: string;
}

const fetchInfo = async () => {
  return API.getUserInfo();
};

export class User {
  loading = false;
  info: UserInfo | null = null;

  fetchUser = flow(function* (this: User) {
    console.log("fetch user info");
    this.loading = true;
    const result = yield fetchInfo();
    this.loading = false;
    if (result.success) {
      this.setUserInfo(result.data);
    }
    return result;
  });

  setUserInfo(info: UserInfo | null) {
    if (!info) return;
    this.info = info;
  }

  @computed
  get funcCodes() {
    return this.info?.funcCodes ?? [];
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default User;

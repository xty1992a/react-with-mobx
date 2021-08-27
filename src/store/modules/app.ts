import { makeAutoObservable, computed, flow } from "mobx";
import { sleep } from "@/utils";

export class App {
  count = 1;
  loading = false;

  setCount = () => {
    this.count++;
  };

  asyncSetCount = flow(function* (this: App) {
    this.loading = true;
    yield sleep(1000);
    this.loading = false;
    this.count += 3;
    return { success: true, data: this.count };
  });

  @computed
  get doubleCount() {
    return this.count * 2;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default App;

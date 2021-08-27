import store from "@/store";
import { useLocalObservable } from "mobx-react";

export const useStores = () => {
  return useLocalObservable(() => store);
};

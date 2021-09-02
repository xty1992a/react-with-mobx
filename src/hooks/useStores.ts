import store from "@/store";
import { useLocalObservable } from "mobx-react-lite";

export const useStores = () => {
  return useLocalObservable(() => store);
};

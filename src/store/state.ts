import { atom } from "recoil";

// Load initial data from localStorage if available
const getLocalStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const skuState = atom({
  key: "skuState",
  default: getLocalStorageData("skuData"),
});

export const planningState = atom({
  key: "planningState",
  default: getLocalStorageData("planningData"),
});

export const ordersState = atom({
  key: "ordersState",
  default: getLocalStorageData("ordersData"),
});

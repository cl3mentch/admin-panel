import { Address, zeroAddress } from "viem";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

export type UserDataState = {
  user: {
    web3_address: Address;
    email: string;
  };
};

export type UserDataAction = {
  setUser: (user: Partial<UserDataState["user"]>) => void;
};

export type UserDataStore = UserDataState & UserDataAction;

export const defaultInitState: UserDataState = {
  user: {
    web3_address: zeroAddress as Address,
    email: "" as string,
  },
};

// Adapter to make localStorage compatible with PersistStorage
const localStorageAdapter: PersistStorage<UserDataStore> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useUserStore = create<UserDataStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setUser: (userUpdate: Partial<UserDataState["user"]>) =>
        set((state) => ({
          user: { ...state.user, ...userUpdate },
        })),
    }),
    {
      name: "storeUserInfo",
      storage: localStorageAdapter, // Use the adapter here
    }
  )
);

import { Address, zeroAddress } from "viem";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // Import the persist middleware

export type UserDataState = {
  user: {
    web3_address: Address;
  };
};

export type UserDataAction = {
  setUser: (user: Partial<UserDataState["user"]>) => void; // Accept partial updates
};

export type UserDataStore = UserDataState & UserDataAction;

export const defaultInitState: UserDataState = {
  user: {
    web3_address: zeroAddress as Address,
  },
};

export const useUserStore = create<UserDataStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setUser: (userUpdate: Partial<UserDataState["user"]>) =>
        set((state) => ({
          user: { ...state.user, ...userUpdate }, // Merge the existing user state with the updates
        })),
    }),
    {
      name: "storeUserInfo", // Name of the storage (localStorage key)
      getStorage: () => localStorage, // You can customize this for other storage mechanisms
    }
  )
);

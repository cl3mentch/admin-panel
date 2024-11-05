import { getAccount, type GetAccountReturnType } from "@wagmi/core";
import { create } from "zustand";
import { config } from "../web3/wagmi/config";

export type WagmiState = {
  account: GetAccountReturnType | undefined;
};

export type WagmiAction = {
  setAccount: (account: GetAccountReturnType | undefined) => void;
};

export type WagmiStore = WagmiState & WagmiAction;

export const defaultInitState: WagmiState = {
  account: getAccount(config),
};

export const useWagmiStore = create<WagmiStore>((set) => ({
  ...defaultInitState,
  setAccount: (account: GetAccountReturnType | undefined) => {
    set({ account });
  },
}));

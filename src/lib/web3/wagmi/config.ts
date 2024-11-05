import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { Config } from "@wagmi/core";
import { cookieStorage, createStorage } from "wagmi";
import { reownChain } from "../chain";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) throw new Error("Project ID is not defined");

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks: [reownChain],
});

export const config = wagmiAdapter.wagmiConfig as Config;

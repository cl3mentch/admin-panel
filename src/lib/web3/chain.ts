import { defineChain, mainnet } from "@reown/appkit/networks";
import { isProduction } from "./contract/contract";

const holesky = defineChain({
  id: 17000,
  caipNetworkId: "eip155:17000",
  chainNamespace: "eip155",
  name: "Holesky",
  nativeCurrency: { name: "Holesky Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ethereum-holesky-rpc.publicnode.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://holesky.etherscan.io",
    },
  },
  contracts: {
    // Add BSC Testnet specific contracts here
  },
});

const sepolia = defineChain({
  id: 11155111,
  caipNetworkId: "eip155:11155111",
  chainNamespace: "eip155",
  name: "Holesky",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
    },
  },
  contracts: {
    // Add BSC Testnet specific contracts here
  },
});

export const reownChain = isProduction ? mainnet : sepolia;

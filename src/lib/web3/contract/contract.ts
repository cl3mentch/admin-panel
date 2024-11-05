import {
  createPublicClient,
  getContract,
  http,
  type Abi,
  type Account,
  type Address,
  type Chain,
  type Client,
  type GetContractReturnType,
  type PublicClient,
  type Transport,
} from "viem";
import { config } from "./config";
import { mainnet, sepolia } from "viem/chains";

export const contracts = config;
export const listABIs:
  | { [K in keyof typeof contracts]: Abi }
  | Record<string, never> = {};
export const wagmiContracts:
  | { [K in keyof typeof contracts]: { address: Address; abi: Abi } }
  | Record<string, never> = {};

let allABIs: Abi = [];

export const isProduction = process.env.NEXT_PUBLIC_APP_ENV === "production";

function _getContract<
  TAbi extends Abi,
  TClient extends {
    public: Client<Transport, Chain | undefined>;
    wallet?:
      | Client<Transport, Chain | undefined, Account | undefined>
      | undefined;
  }
>(name: keyof typeof contracts, abi: TAbi, client: PublicClient) {
  allABIs = [...allABIs, ...abi];

  listABIs[name] = abi;

  wagmiContracts[name] = {
    address: contracts[name] as Address,
    abi: abi,
  };

  return getContract({
    address: `0x${contracts[name as keyof typeof contracts].slice(2)}`,
    abi: abi,
    client: {
      public: client,
    },
  }) as GetContractReturnType<TAbi, TClient, Address>;
}

const publicClient = createPublicClient({
  chain: isProduction ? mainnet : sepolia,
  transport: http(),
});

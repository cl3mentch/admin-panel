import { Address, Hash } from "viem";
import { api } from "../http/https";
import { APIResponse } from "../types/commonType";
import { contracts } from "../web3/contract/contract";

export type TCheckRaffle = 0 | 1;
export type TClaimProof = {
  nftAmount: string;
  rngProof: Hash[];
  rngResultId: number;
  rngResultIsWinner: number;
};
export type TJoinProof = {
  proof: Hash[];
  eligibleNftAmount: string;
  toMintNftAmount: string;
};

export type TWhitelist = {
  sales_group: "GuaranteedMint" | "WhitelistSale" | "PrivateSaleAirdrop";
  nft_amount: string;
}[];

const WhitelistAPI = {
  nft: {
    read: async (web3_address: Address) => {
      try {
        const response = await api.post<TCheckRaffle>("/api/whitelist/read", {
          data: { web3_address },
          useToken: false,
        });

        return response;
      } catch (error) {
        return {
          success: false,
          data: {} as TCheckRaffle,
          msg: (error as Error).message,
        };
      }
    },
    check: {
      raffle: async (
        web3_address: Address
      ): Promise<APIResponse<TCheckRaffle>> => {
        try {
          const response = await api.post<TCheckRaffle>(
            "/api/whitelist/nft/check/raffle",
            {
              data: { web3_address },
              useToken: false,
            }
          );

          return response;
        } catch (error) {
          return {
            success: false,
            data: {} as TCheckRaffle,
            msg: (error as Error).message,
          };
        }
      },
    },
    claim: {
      getProof: async (
        web3_address: Address
      ): Promise<APIResponse<TClaimProof>> => {
        try {
          const response = await api.post<TClaimProof>(
            "/api/whitelist/nft/claim/proof",
            {
              data: { web3_address, contract: contracts.RgzSale },
              useToken: false,
            }
          );

          return response;
        } catch (error) {
          return {
            success: false,
            data: {} as TClaimProof,
            msg: (error as Error).message,
          };
        }
      },
    },
    join: {
      getProof: async (
        web3_address: Address,
        nft_amount: TWhitelist[0]["nft_amount"],
        sales_group: number
      ): Promise<APIResponse<TJoinProof>> => {
        try {
          const response = await api.post<TJoinProof>(
            "/api/whitelist/nft/join/proof",
            {
              data: { web3_address, nft_amount, sales_group },
              useToken: false,
            }
          );

          return response;
        } catch (error) {
          return {
            success: false,
            data: {} as TJoinProof,
            msg: (error as Error).message,
          };
        }
      },
    },
  },
};

export default WhitelistAPI;

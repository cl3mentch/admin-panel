import { Address } from "viem";

export const config = {
  RgzSale: process.env.NEXT_PUBLIC_RGZ_SALE_CONTRACT as Address,
  RgzToken: process.env.NEXT_PUBLIC_RGZ_TOKEN_CONTRACT as Address,
  Treasury: process.env.NEXT_PUBLIC_TREASURY_CONTRACT as Address,
};

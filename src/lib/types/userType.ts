import { Address } from "viem";
import { IPagination } from "./commonType";

export type TUserList = {
  data: {
    id: number;
    user_id: string;
    upline: string;
    web3_address: string;
    nickname: string;
    tag: string;
    authenticator: string;
    referral_code: string;
    status: string;
    email: string;
    password: string;
    telegram: string;
    game_participation: number;
    playable: boolean;
    playable_date: string;
    remark: string;
    created_at: string;
    updated_at: string;
  }[];
  count: number;
  last_page: number;
};

export interface ICreateUserParams {
  web3_address: Address;
  nickname: string;
  tag: string;
  authenticator: string;
  status: string;
  email: string;
  password: string;
  telegram: string;
  remark: string;
}

export interface IReadUserParams
  extends Partial<ICreateUserParams>,
    Partial<IPagination> {
  created_at_start?: string;
  created_at_end?: string;
  updated_at_start?: string;
  updated_at_end?: string;
}

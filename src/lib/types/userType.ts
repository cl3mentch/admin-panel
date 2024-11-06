import { Address } from "viem";

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

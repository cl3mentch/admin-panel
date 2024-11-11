import { Address } from "viem";
import { IPagination } from "./commonType";

export type TAdminList = {
  data: {
    id: number;
    admin_id: string;
    web3_address: string;
    nickname: string;
    tag: string;
    authenticator: string;
    status: string;
    email: string;
    password: string;
    remark: string;
    created_at: string;
    updated_at: string;
  }[];
  count: number;
  last_page: number;
};

export interface ICreateAdminParam {
  web3_address: Address;
  nickname: string;
  tag: string;
  authenticator: string;
  status: string;
  email: string;
  password: string;
  remark: string;
}

export interface IReadAdminParams
  extends Partial<ICreateAdminParam>,
    Partial<IPagination> {
  created_at_start?: string;
  created_at_end?: string;
  updated_at_start?: string;
  updated_at_end?: string;
}

export type TAdminPermissionList = {
  id: 3;
  admin: "thisisatestuser2";
  role: "tester";
} & Partial<TAdminList>;

export interface ICreateAdminPermission {
  admin: string;
  role: string;
  remark: string;
}

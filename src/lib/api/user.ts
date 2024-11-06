import { TUserList } from "@/app/dashboard/user/list/_components/tables/columns";
import { api } from "../http/https";
import { APIResponse } from "../types/commonType";
import { Address } from "viem";

interface ICreateUserParams {
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

const UserAPI = {
  read: async (page: number, size: number): Promise<APIResponse<TUserList>> => {
    try {
      const response = await api.get<TUserList>("/admin/account/user", {
        data: {
          page,
          size,
        },
      });

      return response;
    } catch (error) {
      return {
        success: false,
        data: {} as TUserList,
        msg: (error as Error).message,
      };
    }
  },
  create: async (data: ICreateUserParams) => {
    try {
      const response = await api.get<TUserList>("/admin/account/user", {
        data,
      });

      return response;
    } catch (error) {
      return {
        success: false,
        data: {} as TUserList,
        msg: (error as Error).message,
      };
    }
  },
};

export default UserAPI;

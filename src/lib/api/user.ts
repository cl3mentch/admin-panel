import { apiRequest } from "../http/https";
import { APIResponse } from "../types/commonType";
import {
  ICreateUserParams,
  IReadUserParams,
  TUserList,
  TWalletBalance,
} from "../types/userType";

const UserAPI = {
  read: async (
    user_id?: string,
    param?: IReadUserParams
  ): Promise<APIResponse<TUserList>> => {
    return apiRequest<TUserList>(
      "get",
      `/admin/account/user${user_id ? `/${user_id}` : ""}`,
      { ...param }
    );
  },
  create: async (data: ICreateUserParams): Promise<APIResponse<any>> => {
    return apiRequest("post", "/admin/account/user", data);
  },
  update: async (
    user_id: string,
    data: ICreateUserParams
  ): Promise<APIResponse<any>> => {
    return apiRequest("put", `/admin/account/user/${user_id}`, data);
  },
  delete: async (user_id: string): Promise<APIResponse<any>> => {
    return apiRequest("delete", `/admin/account/user/${user_id}`);
  },
  balance: {
    view: async (user_id: string): Promise<APIResponse<TWalletBalance>> => {
      return apiRequest("get", `/admin/account/user/balance/view/${user_id}`);
    },
    add: async (user_id: string, wallet: number, amount: number) => {
      return apiRequest("put", `/admin/account/user/balance/add/${user_id}`, {
        wallet,
        amount,
      });
    },
    deduct: async (user_id: string, wallet: number, amount: number) => {
      return apiRequest(
        "put",
        `/admin/account/user/balance/deduct/${user_id}`,
        {
          wallet,
          amount,
        }
      );
    },
  },
};

export default UserAPI;

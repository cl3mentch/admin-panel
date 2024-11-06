import { apiRequest } from "../http/https";
import { APIResponse } from "../types/commonType";
import { ICreateUserParams, TUserList } from "../types/userType";

const UserAPI = {
  read: async (page: number, size: number): Promise<APIResponse<TUserList>> => {
    return apiRequest<TUserList>("get", "/admin/account/user", { page, size });
  },
  create: async (data: ICreateUserParams): Promise<APIResponse<any>> => {
    return apiRequest("post", "/admin/account/user", data);
  },
  update: async (
    user_id: number,
    data: ICreateUserParams
  ): Promise<APIResponse<any>> => {
    return apiRequest("put", `/admin/account/user/${user_id}`, data);
  },
  delete: async (user_id: number): Promise<APIResponse<any>> => {
    return apiRequest("delete", `/admin/account/user/${user_id}`);
  },
  balance: {
    view: async (user_id: number) => {
      return apiRequest("get", `/admin/account/user/balance/view/${user_id}`);
    },
    add: async (user_id: number, wallet: number, amount: number) => {
      return (
        apiRequest("put", `/admin/account/user/balance/add/${user_id}`),
        { data: { wallet, amount } }
      );
    },
    deduct: async (user_id: number, wallet: number, amount: number) => {
      return (
        apiRequest("put", `/admin/account/user/balance/deduct/${user_id}`),
        { data: { wallet, amount } }
      );
    },
  },
};

export default UserAPI;

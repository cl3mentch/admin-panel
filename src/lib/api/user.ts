import { TUserList } from "@/app/dashboard/user/list/columns";
import { api } from "../http/https";
import { APIResponse } from "../types/commonType";

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
};

export default UserAPI;

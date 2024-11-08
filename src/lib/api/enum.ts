import { apiRequest } from "../http/https";
import { APIResponse } from "../types/commonType";

const EnumAPI = {
  listing: async <TEnum>(type: string): Promise<APIResponse<TEnum>> => {
    return apiRequest<TEnum>("get", "/admin/enumList/list", {
      type,
    });
  },
};

export default EnumAPI;

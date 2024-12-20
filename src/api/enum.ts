import { APIResponse } from "@/lib/types/commonType";
import { apiRequest } from "@/utils/http/https";


const EnumAPI = {
  listing: async <TEnum>(type: string): Promise<APIResponse<TEnum>> => {
    return apiRequest<TEnum>("get", "/admin/enumList/list", {
      type,
    });
  },
};

export default EnumAPI;

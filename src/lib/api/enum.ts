import { apiRequest } from "../http/https";
import { APIResponse } from "../types/commonType";

type TAccountStatusEnum = {
  active: "active";
  freezed: "freezed";
  inactivated: "inactivated";
  suspended: "suspended";
};

const EnumAPI = {
  listing: async (type: string): Promise<APIResponse<TAccountStatusEnum>> => {
    return apiRequest<TAccountStatusEnum>("get", "/admin/enumList/list", {
      type,
    });
  },
};

export default EnumAPI;

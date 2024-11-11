import { toast } from "sonner";
import EnumAPI from "../api/enum";

export const getAccountStatusEnum = async () => {
  const result = await EnumAPI.listing<TAccountStatusEnum>("account_status");
  if (result.success) {
    return Object.values(result.data);
  } else {
    toast.error("Failed to get enum");
  }
};

export const getWalletEnum = async () => {
  const result = await EnumAPI.listing<TWalletEnum>("wallet");
  if (result.success) {
    // Convert into an array
    return Object.values(result.data);
  } else {
    toast.error("Failed to get enum");
  }
};

export const getAdminRoleEnum = async () => {
  const result = await EnumAPI.listing<TWalletEnum>("admin_role");
  if (result.success) {
    // Convert into an array
    return Object.values(result.data);
  } else {
    toast.error("Failed to get enum");
  }
};

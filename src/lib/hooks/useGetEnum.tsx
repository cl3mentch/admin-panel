import { toast } from "sonner";
import { TFieldConfig } from "../types/formType";
import EnumAPI from "../api/enum";
import { useEffect, useState } from "react";

function useGetEnum(fieldConfig: TFieldConfig[]) {
  const [, setForceUpdate] = useState(false);

  const getAccountStatusEnum = async () => {
    const result = await EnumAPI.listing("account_status");
    if (result.success) {
      fieldConfig.find((config) => {
        if (config.name === "status" && config.component === "select") {
          config.options = Object.values(result.data);
          setForceUpdate(true);
        }
      });
    } else {
      toast.error("Failed to get account status enum");
    }
  };

  const getWalletEnum = async () => {
    const result = await EnumAPI.listing("wallet");
    if (result.success) {
      fieldConfig.find((config) => {
        if (config.name === "wallet" && config.component === "select") {
          config.options = Object.values(result.data);
          setForceUpdate(true);
        }
      });
    } else {
      toast.error("Failed to get account status enum");
    }
  };

  useEffect(() => {
    getAccountStatusEnum();
    getWalletEnum();
  });

  return { getAccountStatusEnum, getWalletEnum };
}

export default useGetEnum;

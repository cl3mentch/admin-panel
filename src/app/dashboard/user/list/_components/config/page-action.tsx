"use client";

import { TAction } from "@/components/shared/table/data-actions";
import UserAPI from "@/lib/api/user";
import { onTranslateBackendError } from "@/lib/helper";
import { toast } from "sonner";

const baseUrl = "/dashboard/user/list/";
const param = "?userid=";
export const deleteRecord = async (id: string) => {
  const result = await UserAPI.delete(id);

  if (result.success) {
    toast.success("Delete Successfully");
  } else {
    onTranslateBackendError(result.data);
  }
};

export const pageActionOptions: TAction = [
  { name: "view", icon: "hugeicons:view", param },
  { name: "edit", icon: "basil:edit-outline", param },
  { name: "delete", icon: "material-symbols:delete-outline", param },
].map((action) => ({
  ...action,
  path: `${baseUrl}${action.name}`,
})) as TAction;

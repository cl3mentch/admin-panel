import { TAction } from "@/components/shared/table/data-actions";

const baseUrl = "/dashboard/user/list/";
const param = "?userid=";

export const pageActionOptions: TAction = [
  { name: "view", icon: "hugeicons:view", param },
  { name: "edit", icon: "basil:edit-outline", param },
  { name: "delete", icon: "material-symbols:delete-outline", param },
].map((action) => ({
  ...action,
  path: `${baseUrl}${action.name}`, // Dynamically create the path
})) as TAction;

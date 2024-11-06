import { TAction } from "@/components/shared/table/actions";

export const actionOptions: TAction = [
  {
    name: "view",
    path: "/dashboard/user/list/view",
    icon: "hugeicons:view",
  },
  {
    name: "edit",
    path: "/dashboard/user/list/edit",
    icon: "basil:edit-outline",
  },
  {
    name: "delete",
    path: "",
    icon: "material-symbols:delete-outline",
  },
];

"use client";
import DataAction, { TAction } from "@/components/shared/table/data-actions";
import { TPageConfig } from "@/lib/types/commonType";
import { TUserList } from "@/lib/types/userType";
import { ColumnDef } from "@tanstack/react-table";

// Base URL and param configuration
const baseUrl = "/dashboard/user/list/";
const param = "?userid=";

// Action configuration
const actions: TAction = [
  { name: "view", icon: "hugeicons:view", param },
  { name: "edit", icon: "basil:edit-outline", param },
  { name: "delete", icon: "material-symbols:delete-outline", param },
].map((action) => ({
  ...action,
  path: `${baseUrl}${action.name}`,
})) as TAction;

/**
 * Columns configuration
 *
 * These represents the column of the table and will be pass as a prop to table component @Tablepage
 * */
const columns: ColumnDef<TUserList["data"][0]>[] = [
  {
    accessorKey: "id",
    header: "UID",
  },
  {
    accessorKey: "user_id",
    header: "User SN",
  },
  {
    accessorKey: "upline",
    header: "Upline",
  },
  {
    accessorKey: "authenticator",
    header: "Authenticator",
  },
  {
    accessorKey: "web3_address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "game_participation",
    header: "Played Times",
  },
  {
    accessorKey: "telegram",
    header: "Telegram",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return <DataAction data={user} actions={actions} />;
    },
  },
];

// Final config object that combines columns and actions
export const pageConfig: TPageConfig<TUserList["data"][0]> = {
  columns,
  actions,
};

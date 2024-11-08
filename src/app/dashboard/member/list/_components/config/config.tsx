"use client";
import DataAction, { TAction } from "@/components/shared/table/data-actions";
import { Button } from "@/components/ui/button";
import { TPageConfig } from "@/lib/types/commonType";
import { TUserList } from "@/lib/types/userType";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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
    header: ({ column }) => <DataTableHeader column={column} title={"ID"} />,
  },
  {
    accessorKey: "user_id",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"User_id"} />
    ),
  },
  {
    accessorKey: "upline",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"Upline"} />
    ),
  },
  {
    accessorKey: "authenticator",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"Authenticator"} />
    ),
  },
  {
    accessorKey: "web3_address",
    header: "Web3_address",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "game_participation",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"Game_participation"} />
    ),
  },
  {
    accessorKey: "telegram",
    header: "Telegram",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableHeader column={column} title={"Created_at"} />;
    },
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

function DataTableHeader({ title, column }: any) {
  return (
    <Button
      variant="ghost"
      size={"sm"}
      className="p-0 h-fit text-xs font-semibold text-foreground hover:bg-transparent"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="h-3 w-3" />
    </Button>
  );
}

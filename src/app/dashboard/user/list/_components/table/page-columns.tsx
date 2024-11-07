import DataAction from "@/components/shared/table/data-actions";
import { TUserList } from "@/lib/types/userType";
import { ColumnDef } from "@tanstack/react-table";
import { pageActionOptions } from "./page-action";

export const columns: ColumnDef<TUserList["data"][0]>[] = [
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

      return <DataAction data={user} options={pageActionOptions} />;
    },
  },
];

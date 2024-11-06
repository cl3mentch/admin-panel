import Actions, { TAction } from "@/components/shared/table/actions";
import { ColumnDef } from "@tanstack/react-table";
import { actionOptions } from "./user-action";

export type TUserList = {
  data: {
    id: number;
    user_id: string;
    upline: string;
    web3_address: string;
    nickname: string;
    tag: string;
    authenticator: string;
    referral_code: string;
    status: string;
    email: string;
    password: string;
    telegram: string;
    game_participation: number;
    playable: boolean;
    playable_date: string;
    remark: string;
    created_at: string;
    updated_at: string;
  }[];
  count: number;
  last_page: number;
};

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

      return <Actions data={user} options={actionOptions} />;
    },
  },
];

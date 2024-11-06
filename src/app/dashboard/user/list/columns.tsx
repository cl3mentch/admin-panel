import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    id: "actions",
    header: "Actions",
    enablePinning: true,

    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Actions</span>
              <MoreHorizontal className="h-4 w-4 text-black dark:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

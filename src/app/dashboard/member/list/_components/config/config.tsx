"use client";
import DataAction, { TAction } from "@/components/shared/table/data-actions";
import { Button } from "@/components/ui/button";
import { APIResponse, IPagination, TPageConfig } from "@/lib/types/commonType";
import {
  ICreateUserParams,
  IReadUserParams,
  TUserList,
} from "@/lib/types/userType";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { baseUrl, param } from "./setting";
import { toast } from "sonner";
import { onTranslateBackendError } from "@/lib/helper";
import { apiRequest } from "@/lib/http/https";

// Action configuration
const actions: TAction = [
  { name: "view", icon: "hugeicons:view", param },
  { name: "edit", icon: "basil:edit-outline", param },
  { name: "delete", icon: "material-symbols:delete-outline", param },
].map((action) => ({
  ...action,
  path: `${window.location.pathname}/${action.name}`,
})) as TAction;

/**
 * Columns configuration
 *
 * These represents the column of the table and will be pass to useReactTable in @table_page
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
    header: ({ column }) => (
      <DataTableHeader column={column} title={"web3_address"} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"status"} />
    ),
  },
  {
    accessorKey: "game_participation",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"Game_participation"} />
    ),
  },
  {
    accessorKey: "telegram",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"telegram"} />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"Created_at"} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DataAction
          data={user}
          actions={actions}
          deleteRecord={pageConfig.method.deleteRecord}
        />
      );
    },
  },
];

function DataTableHeader({ title, column }: any) {
  return (
    <Button
      variant="ghost"
      size={"sm"}
      className="p-0 h-fit text-xs font-semibold text-foreground hover:bg-transparent capitalize"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="h-3 w-3" />
    </Button>
  );
}

/**
 * Just adjust the api that is scoped inside of the crud method, it will auto fill up the rest of the function
 * */
const method = {
  getRecord: async (id?: string, param?: IReadUserParams) => {
    return await apiRequest<TUserList>(
      "get",
      `${baseUrl}${id ? `/${id}` : ""}`,
      { ...param }
    );
  },
  createRecord: async (
    values: ICreateUserParams
  ): Promise<APIResponse<any>> => {
    return await apiRequest("post", baseUrl, values);
  },
  updateRecord: async (id: string, param: ICreateUserParams) => {
    return await apiRequest("put", `${baseUrl}/${id}`, param);
  },
  deleteRecord: async (id: string) => {
    const result = await apiRequest("delete", `${baseUrl}/${id}`);

    if (result.success) {
      toast.success("Delete Successfully");
    } else {
      onTranslateBackendError(result.data);
    }
  },
};

/**
 * Custom Service
 * Note - write api services that are uncommon and requires customization here
 * */
const customMethod = {
  getBalance: async (id: string) => {
    return await apiRequest("get", `${baseUrl}/balance/view/${id}`);
  },
  addBalance: async (id: string, wallet: number, amount: number) => {
    return await apiRequest("put", `${baseUrl}/balance/add/${id}`, {
      wallet,
      amount,
    });
  },
  deductBalance: async (id: string, wallet: number, amount: number) => {
    return await apiRequest("put", `${baseUrl}/balance/deduct/${id}`, {
      wallet,
      amount,
    });
  },
};

// Final config object that combines columns and actions
export const pageConfig: TPageConfig<TUserList["data"][0]> = {
  columns,
  actions,
  method,
  customMethod,
};

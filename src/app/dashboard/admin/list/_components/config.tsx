"use client";
import { Button } from "@/components/ui/button";
import { onTranslateBackendError } from "@/lib/helper";
import { APIResponse, TPageConfig } from "@/lib/types/commonType";
import { ICreateUserParams, IReadUserParams } from "@/lib/types/userType";
import { apiRequest } from "@/utils/http/https";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import DataAction, { TAction } from "./data-action";
import { baseUrl, PageColumnType, PageListingType } from "./setting";

// Action configuration
const actions: TAction = [
  { name: "edit", icon: "basil:edit-outline" },
  { name: "delete", icon: "material-symbols:delete-outline" },
] as TAction;

/**
 * Columns configuration
 *
 * These represents the column of the table and will be pass to useReactTable in @table_page
 * */
const columns: ColumnDef<PageColumnType>[] = [
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
      const data = row.original;
      return (
        <DataAction
          data={data}
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
    return await apiRequest<PageListingType>(
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
export const pageConfig: TPageConfig<
  PageColumnType,
  typeof method,
  typeof customMethod
> = {
  columns,
  actions,
  method,
  customMethod,
};

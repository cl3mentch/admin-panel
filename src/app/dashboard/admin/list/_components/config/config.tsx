"use client";
import DataAction, { TAction } from "@/components/shared/table/data-actions";
import { Button } from "@/components/ui/button";
import { onTranslateBackendError } from "@/lib/helper";
import { apiRequest } from "@/utils/http/https";
import {
  ICreateAdminParam,
  IReadAdminParams,
  TAdminList,
} from "@/lib/types/adminType";
import { APIResponse, TPageConfig } from "@/lib/types/commonType";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { baseUrl, param } from "./setting";

type PageColumnType = TAdminList["data"][0];
type PageListingType = TAdminList;

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
const columns: ColumnDef<PageColumnType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableHeader column={column} title={"ID"} />,
  },
  {
    accessorKey: "admin_id",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"admin_id"} />
    ),
  },
  {
    accessorKey: "web3_address",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"web3_address"} />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableHeader column={column} title={"email"} />,
  },
  {
    accessorKey: "authenticator",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"Authenticator"} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"status"} />
    ),
  },
  {
    accessorKey: "tag",
    header: ({ column }) => <DataTableHeader column={column} title={"tag"} />,
  },
  {
    accessorKey: "remark",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"remark"} />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"created_at"} />
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableHeader column={column} title={"updated_at"} />
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
  getRecord: async (id?: string, param?: IReadAdminParams) => {
    return await apiRequest<PageListingType>(
      "get",
      `${baseUrl}${id ? `/${id}` : ""}`,
      { ...param }
    );
  },
  createRecord: async (param: ICreateAdminParam): Promise<APIResponse<any>> => {
    return await apiRequest("post", baseUrl, param);
  },
  updateRecord: async (id: string, param: ICreateAdminParam) => {
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

/**** End ****/

// Final config object that combines columns and actions
export const pageConfig: TPageConfig<PageColumnType, typeof method, undefined> =
  {
    columns,
    actions,
    method,
  };

"use client";
import DataAction, { TAction } from "@/components/shared/table/data-actions";
import { Button } from "@/components/ui/button";
import { onTranslateBackendError } from "@/lib/helper";
import { apiRequest } from "@/lib/http/https";
import {
  ICreateAdminParam,
  IReadAdminParams,
  TAdminList,
  TAdminPermissionList,
} from "@/lib/types/adminType";
import { APIResponse, TPageConfig } from "@/lib/types/commonType";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { baseUrl, param } from "./setting";

type PageListingType = TAdminPermissionList;

// Action configuration
const actions: TAction = [
  { name: "view", icon: "hugeicons:view", param },
  { name: "edit", icon: "basil:edit-outline", param },
  { name: "delete", icon: "material-symbols:delete-outline", param },
].map((action) => {
  const cleanedPathname = window.location.pathname.replace(
    /\/(view|create|edit)$/,
    ""
  );
  return {
    ...action,
    path: `${cleanedPathname}/${action.name}`,
  };
}) as TAction;

/**
 * Columns configuration
 *
 * These represents the column of the table and will be pass to useReactTable in @table_page
 * */
const columns: ColumnDef<PageListingType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableHeader column={column} title={"ID"} />,
  },
  {
    accessorKey: "admin",
    header: ({ column }) => <DataTableHeader column={column} title={"admin"} />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableHeader column={column} title={"role"} />,
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
    return await apiRequest<TAdminList>(
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
export const pageConfig: TPageConfig<
  PageListingType,
  typeof method,
  undefined
> = {
  columns,
  actions,
  method,
};

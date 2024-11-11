import { TAction } from "@/components/shared/table/data-actions";
import { ColumnDef } from "@tanstack/react-table";

export type APIResponse<T = any> = {
  success: boolean;
  data: T;
  msg: string;
};

export type APIMethod = "GET" | "POST" | "PUT" | "DELETE";

// ***************** Interface *************
export interface APIOptions {
  data?: Record<string, any>;
  useToken?: boolean;
}

export interface IPagination {
  page: number;
  size: number;
}

export interface IGetErrorType {
  walk: (callback: (e: unknown) => boolean) => boolean;
  shortMessage: string;
}

export type TPageConfig<TColumn> = {
  columns: ColumnDef<TColumn>[];
  actions: TAction;
  method: any;
  customMethod?: any;
};

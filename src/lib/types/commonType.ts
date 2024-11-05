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
  page?: number;
  size?: number;
}

export interface IGetErrorType {
  walk: (callback: (e: unknown) => boolean) => boolean;
  shortMessage: string;
}

// history list
export type THistoryType = "transaction" | "game" | "chosenOne";

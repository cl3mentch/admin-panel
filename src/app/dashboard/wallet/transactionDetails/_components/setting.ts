import { TTransactionDetail } from "@/lib/types/transactionType";

// Current page setting
export const pageTitle = "Transaction Detail";
export const baseUrl = "/admin/wallet/transaction/detail";

export type PageColumnType = TTransactionDetail["data"][0];
export type PageListingType = TTransactionDetail;

import { TTransactionList } from "@/lib/types/transactionType";

// Current page setting
export const pageTitle = "Transaction List";
export const baseUrl = "/admin/wallet/transaction";

export type PageColumnType = TTransactionList["data"][0];
export type PageListingType = TTransactionList;

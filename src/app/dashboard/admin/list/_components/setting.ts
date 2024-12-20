import { TAdminList } from "@/lib/types/adminType";

// Current page setting
export const pageTitle = "Admin List";
export const baseUrl = "/admin/account/admin";

export type PageColumnType = TAdminList["data"][0];
export type PageListingType = TAdminList;

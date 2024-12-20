import { TUserList } from "@/lib/types/userType";

// Current page setting
export const pageTitle = "Member List";
export const baseUrl = "/admin/account/user";

export type PageColumnType = TUserList["data"][0];
export type PageListingType = TUserList;

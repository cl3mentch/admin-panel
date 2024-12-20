import { TAdminPermissionList } from "@/lib/types/adminType";

// Current page setting
export const pageTitle = "Admin Permission";
export const baseUrl = "/admin/permission/admin";

export type PageColumnType = TAdminPermissionList["data"][0];
export type PageListingType = TAdminPermissionList;
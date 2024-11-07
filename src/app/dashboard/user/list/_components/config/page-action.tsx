"use client";

import { TAction } from "@/components/shared/table/data-actions";
import UserAPI from "@/lib/api/user";
import { onTranslateBackendError } from "@/lib/helper";
import { IPagination } from "@/lib/types/commonType";
import { ICreateUserParams } from "@/lib/types/userType";
import { toast } from "sonner";

const baseUrl = "/dashboard/user/list/";
const param = "?userid=";

//These are the actions
export const pageActionOptions: TAction = [
  { name: "view", icon: "hugeicons:view", param },
  { name: "edit", icon: "basil:edit-outline", param },
  { name: "delete", icon: "material-symbols:delete-outline", param },
].map((action) => ({
  ...action,
  path: `${baseUrl}${action.name}`,
})) as TAction;

// Adjust ur api here
export const getRecord = async (userId?: string, pagination?: IPagination) => {
  return await UserAPI.read(userId, {
    ...pagination,
  });
};

export const createRecord = async (values: ICreateUserParams) => {
  return await UserAPI.create({ ...values });
};

export const updateRecord = async (
  userId: string,
  values: ICreateUserParams
) => {
  return await UserAPI.update(userId, { ...values });
};

export const deleteRecord = async (id: string) => {
  const result = await UserAPI.delete(id);

  if (result.success) {
    toast.success("Delete Successfully");
  } else {
    onTranslateBackendError(result.data);
  }
};

export const getBalance = async (userId: string) => {
  return await UserAPI.balance.view(userId);
};

export const addBalance = async (
  userId: string,
  wallet: number,
  amount: number
) => {
  return await UserAPI.balance.add(userId, wallet, amount);
};

export const deductBalance = async (
  userId: string,
  wallet: number,
  amount: number
) => {
  return await UserAPI.balance.deduct(userId, wallet, amount);
};

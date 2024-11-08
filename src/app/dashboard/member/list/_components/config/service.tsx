"use client";

import UserAPI from "@/lib/api/user";
import { onTranslateBackendError } from "@/lib/helper";
import { IPagination } from "@/lib/types/commonType";
import { ICreateUserParams } from "@/lib/types/userType";
import { toast } from "sonner";

/**
 * Just adjust the api that is scoped inside of the crud method, it will auto fill up the rest of the function
 * */
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

/**
 * Custom Service
 * Note - write api services that are uncommon and requires customization here
 * */

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

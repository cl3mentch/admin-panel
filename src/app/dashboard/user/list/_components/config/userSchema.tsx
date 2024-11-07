import { TFieldConfig } from "@/lib/types/formType";
import { Address, isAddress } from "viem";
import * as z from "zod";

/**
 *  the @userDetailFieldConfig name key's value needs to be the same as the @userFormSchema keys or else it wont work
 *  Eg : @userDetailFieldConfig @name  == @userFormSchema @key
 */
export const userFormSchema = z.object({
  web3_address: z
    .string()
    .min(1, { message: "Wallet Address is required" })
    .refine((value) => isAddress(value), {
      message: "Wallet Address Wrong Format",
    }),
  status: z.string().min(1, { message: "Status is required" }),
  upline: z
    .string()
    .min(1, { message: "Wallet Address is required" })
    .refine((value) => isAddress(value), {
      message: "Wallet Address Wrong Format",
    }),
  tag: z.string().optional(),
  nickname: z.string().optional(),
  telegram: z.string().optional(),
  remark: z.string().optional(),
});

/**
 * Initial values of the zod input value
 * */
export const defaultValues = {
  web3_address: "" as Address,
  status: "",
  upline: "" as Address,
  tag: "",
  nickname: "",
  telegram: "",
  remark: "",
};

/**
 * This is to setup ui input field
 * */
export let userDetailFieldConfig: TFieldConfig[] = [
  {
    name: "web3_address",
    label: "Wallet Address",
    component: "input",
    type: "text",
    placeholder: "Enter your wallet address",
    isRequired: true,
  },
  {
    name: "status",
    label: "Status",
    component: "select",
    placeholder: "Select account status",
    options: [],
    isRequired: true,
  },
  {
    name: "upline",
    label: "Upline",
    component: "input",
    type: "text",
    placeholder: "Enter your upline",
    isRequired: true,
  },
  {
    name: "nickname",
    label: "Nickname",
    component: "input",
    type: "text",
    placeholder: "Enter your nickname",
    isRequired: false,
  },
  {
    name: "telegram",
    label: "Telegram",
    component: "input",
    type: "text",
    placeholder: "Enter your telegram",
    isRequired: false,
  },
  {
    name: "tag",
    label: "Tag",
    component: "input",
    type: "text",
    placeholder: "Enter your tag",
    isRequired: false,
  },
  {
    name: "remark",
    label: "Remark",
    component: "input",
    type: "text",
    placeholder: "Enter your remark",
    isRequired: false,
  },
];

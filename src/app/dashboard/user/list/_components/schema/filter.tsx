import { TFieldConfig } from "@/lib/types/formType";
import { Address } from "viem";
import * as z from "zod";

/**
 * Schema config
 * - This is bone structure of your form and it is use to validate form input like create or update
 *
 *  the @userDetailFieldConfig name key's value needs to be the same as the @userFormSchema keys or else it wont work
 *  Eg : @userDetailFieldConfig @name  == @userFormSchema @key
 */
const filterFormSchema = z.object({
  web3_address: z.string().optional(),
  status: z.string().optional(),
  upline: z.string().optional(),
  tag: z.string().optional(),
  nickname: z.string().optional(),
  telegram: z.string().optional(),
  created_at_start: z.date().optional(),
});

/**
 * Initial values of the zod input value
 * */
const filterDefaultState = {
  web3_address: "" as Address,
  status: "",
  upline: "" as Address,
  tag: "",
  nickname: "",
  telegram: "",
};

/**
 * This is to setup ui input field
 * */
let filterFieldConfig: TFieldConfig[] = [
  {
    name: "web3_address",
    label: "Wallet Address",
    component: "input",
    type: "text",
    placeholder: "Enter your wallet address",
    isRequired: false,
  },
  {
    name: "status",
    label: "Status",
    component: "select",
    placeholder: "Select account status",
    options: [],
    isRequired: false,
  },
  {
    name: "upline",
    label: "Upline",
    component: "input",
    type: "text",
    placeholder: "Enter your upline",
    isRequired: false,
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
    name: "created_at_start",
    label: "Created Date",
    component: "date",
    placeholder: "Enter your date",
    isRequired: false,
  },
];

export let filterFormConfig = {
  schema: filterFormSchema,
  defaultValues: filterDefaultState,
  field: filterFieldConfig,
};
import { getAccountStatusEnum } from "@/lib/service/getEnum";
import { TFieldConfig } from "@/lib/types/formType";
import { Address, isAddress } from "viem";
import * as z from "zod";

/**
 * Schema config
 * - This is bone structure of your form and it is use to validate form input like create or update
 *
 *  the @userDetailFieldConfig name key's value needs to be the same as the @userFormSchema keys or else it wont work
 *  Eg : @userDetailFieldConfig @name  == @userFormSchema @key
 */
const schema = z
  .object({
    web3_address: z
      .string()
      .min(1, { message: "Wallet Address is required" })
      .refine((value) => isAddress(value), {
        message: "Wallet Address Wrong Format",
      }),
    status: z.string().min(1, { message: "Status is required" }),
    email: z.string().optional(),
    password: z.string().min(1, { message: "Password is required" }).optional(),
    tag: z.string().optional(),
    nickname: z.string().optional(),
    remark: z.string().optional(),
    check: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.email && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required when email is provided",
      path: ["password"],
    }
  );

/**
 * Initial values of the zod input value
 * */
const defaultValues: z.infer<typeof schema> = {
  web3_address: "" as Address,
  email: "",
  password: "",
  status: "",
  tag: "",
  nickname: "",
  remark: "",
  check: false,
};

/**
 * This is to setup ui input field
 * */
let fieldConfig: TFieldConfig[] = [
  {
    name: "web3_address",
    label: "Wallet Address",
    component: "input",
    type: "text",
    placeholder: "Enter your wallet address",
    isRequired: true,
  },
  {
    name: "email",
    label: "Email Address",
    component: "input",
    type: "email",
    placeholder: "Enter your email address",
    isRequired: false,
  },
  {
    name: "password",
    label: "password",
    component: "input",
    type: "password",
    placeholder: "Enter your password",
    isRequired: false,
  },
  {
    name: "status",
    label: "Status",
    component: "select",
    placeholder: "Select account status",
    options: (await getAccountStatusEnum()) as any,
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
  {
    name: "check",
    label: "I agree that the information above is correct",
    component: "checkbox",
    isRequired: true,
  },
];

export let pageFormConfig = {
  schema,
  defaultValues,
  field: fieldConfig,
};

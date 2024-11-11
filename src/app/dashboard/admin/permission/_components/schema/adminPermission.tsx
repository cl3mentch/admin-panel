import { getAdminRoleEnum } from "@/lib/service/getEnum";
import { TFieldConfig } from "@/lib/types/formType";
import * as z from "zod";

/**
 * Schema config
 * - This is bone structure of your form and it is use to validate form input like create or update
 *
 *  the @userDetailFieldConfig name key's value needs to be the same as the @userFormSchema keys or else it wont work
 *  Eg : @userDetailFieldConfig @name  == @userFormSchema @key
 */
const schema = z.object({
  role: z.string(),
  remark: z.string().optional(),
  check: z.boolean().default(false),
});

/**
 * Initial values of the zod input value
 * */
const defaultValues: z.infer<typeof schema> = {
  role: "",
  remark: "",
  check: false,
};

/**
 * This is to setup ui input field
 * */
let fieldConfig: TFieldConfig[] = [
  {
    name: "admin",
    label: "admin",
    component: "input",
    type: "text",
    placeholder: "Enter your admin name",
    isRequired: true,
  },
  {
    name: "role",
    label: "role",
    component: "select",
    placeholder: "Select role",
    options: (await getAdminRoleEnum()) as any,
    isRequired: true,
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

export let userFormConfig = {
  schema,
  defaultValues,
  field: fieldConfig,
};

import { TFieldConfig } from "@/lib/types/formType";
import * as z from "zod";

/**
 *  the @userDetailFieldConfig name key's value needs to be the same as the @userFormSchema keys or else it wont work
 *  Eg : @userDetailFieldConfig @name  == @userFormSchema @key
 */
export const balanceFormSchema = z.object({
  usdt: z.coerce.number().min(1, { message: "USDT Amount is required" }),
  peic: z.coerce.number().min(1, { message: "pEIC Amount is required" }),
  point: z.coerce.number().min(1, { message: "Point Amount is required" }),
  locked_peic: z.coerce
    .number()
    .min(1, { message: "Locked pEIC Amount is required" }),
  party_ticket: z.coerce
    .number()
    .min(1, { message: "Party Ticket Amount is required" }),
  nft: z.coerce.number().min(1, { message: "NFT Amount is required" }),
  beic: z.coerce.number().min(1, { message: "bEIC Amount is required" }),
  check: z.boolean().default(false),
});

/**
 * Initial values of the zod input value
 * */
export const balanceDefaultValues = {
  usdt: 0,
  peic: 0,
  point: 0,
  locked_peic: 0,
  party_ticket: 0,
  nft: 0,
  beic: 0,
  check: false,
};

/**
 * This is to setup ui input field
 * */
export let balanceFieldConfig: TFieldConfig[] = [
  {
    name: "usdt",
    label: "USDT Balance",
    component: "input",
    type: "number",
    placeholder: "Enter USDT Amount",
    isRequired: true,
  },
  {
    name: "peic",
    label: "pEIC Balance",
    component: "input",
    type: "number",
    placeholder: "Enter EIC Amount",
    isRequired: true,
  },
  {
    name: "point",
    label: "Point Balance",
    component: "input",
    type: "number",
    placeholder: "Enter Point Amount",
    isRequired: true,
  },
  {
    name: "locked_peic",
    label: "Locked pEIC",
    component: "input",
    type: "number",
    placeholder: "Enter Locked pEIC Amount",
    isRequired: true,
  },
  {
    name: "party_ticket",
    label: "Party Ticket",
    component: "input",
    type: "number",
    placeholder: "Enter Party Ticket Amount",
    isRequired: true,
  },
  {
    name: "nft",
    label: "NFT",
    component: "input",
    type: "number",
    placeholder: "Enter NFT Amount",
    isRequired: true,
  },
  {
    name: "beic",
    label: "bEIC",
    component: "input",
    type: "number",
    placeholder: "Enter bEIC Amount",
    isRequired: true,
  },
  {
    name: "check",
    label: "I agree that the information above is correct",
    component: "checkbox",
    isRequired: true,
  },
];

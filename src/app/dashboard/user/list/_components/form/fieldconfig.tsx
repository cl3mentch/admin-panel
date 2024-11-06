import { TFieldConfig } from "@/lib/types/formType";

export const fieldConfig: TFieldConfig[] = [
  {
    name: "name",
    label: "Name",
    component: "input",
    type: "text",
    placeholder: "Enter your name",
    isRequired: true,
  },
  {
    name: "country",
    label: "Country",
    component: "select",
    placeholder: "Select your country",
    options: ["USA", "UK", "Canada", "Australia", "Germany", "France"],
    isRequired: false,
  },
  {
    name: "email",
    label: "Email",
    component: "input",
    type: "email",
    placeholder: "Enter your email",
    isRequired: false,
  },
  {
    name: "company",
    label: "Company",
    component: "input",
    type: "text",
    placeholder: "Enter your company",
    isRequired: false,
  },
];

import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().min(1, { message: "Company is requried" }),
});

export const defaultValues = {
  name: "",
  country: "",
  email: "",
  company: "",
};

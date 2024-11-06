"use client";

import FormComp from "@/components/shared/form/FormComp";
import { fieldConfig } from "./form/fieldconfig";
import { defaultValues, formSchema } from "./form/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TFormData = z.infer<typeof formSchema>;

export default function UserViewPage({ slug }: any) {
  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return (
    <>
      <FormComp
        form={form} // Pass the shape of the schema if needed, or any raw data
        fieldConfig={fieldConfig}
        title="View User Information"
      />
    </>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Filter } from "../../../../../../components/shared/table/data-filter";
import {
  filterDefaultState,
  filterFieldConfig,
  filterFormSchema,
} from "../../[slug]/_components/schema/filterSchema";

interface FilterDataProps {
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; size: number }>
  >;
}

export function PageFilter({ setFilters, setPagination }: FilterDataProps) {
  type TFilterFormSchema = z.infer<typeof filterFormSchema>;

  const filterForm = useForm<TFilterFormSchema>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: filterDefaultState,
    mode: "onChange",
  });

  const onFormSubmit = (value: TFilterFormSchema) => {
    setPagination((prev) => ({ ...prev, page: 1 }));

    // Iterate over each value to check if it's a Date and format it
    const formattedValue = Object.entries(value).reduce((acc, [key, val]) => {
      if (val instanceof Date) {
        // YYYY-MM-DD
        const formattedDate = `${val.getFullYear()}/${(val.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${val.getDate().toString().padStart(2, "0")}`;
        // @ts-ignore
        acc[key as keyof TFilterFormSchema] = formattedDate; // Cast key to keyof TFilterFormSchema
      } else {
        // @ts-ignore
        acc[key as keyof TFilterFormSchema] = val;
      }
      return acc;
    }, {} as TFilterFormSchema); // Use the same type for the resulting object

    setFilters(formattedValue);
  };

  return (
    <Filter
      fieldConfig={filterFieldConfig}
      form={filterForm}
      onFormSubmit={onFormSubmit}
    />
  );
}

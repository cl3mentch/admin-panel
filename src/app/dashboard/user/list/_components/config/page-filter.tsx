"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Filter } from "../../../../../../components/shared/table/data-filter";
import {
  filterDefaultState,
  filterFieldConfig,
  filterFormSchema,
} from "../config/filterSchema";

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
    setFilters(value);
  };

  return (
    <Filter
      fieldConfig={filterFieldConfig}
      form={filterForm}
      onFormSubmit={onFormSubmit}
    />
  );
}

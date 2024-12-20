/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Filter } from "@/components/shared/table/data-filter";
import { DataPagination } from "@/components/shared/table/data-pagination";
import { DataTable } from "@/components/shared/table/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { onTranslateBackendError } from "@/lib/helper";
import { useActionStore } from "@/store/actionStore";
import { TUserList } from "@/lib/types/userType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { z } from "zod";
import { pageConfig } from "../config/config";
import { filterFormConfig } from "../schema/filter";
import { pageTitle } from "../config/setting";
import { TAdminList } from "@/lib/types/adminType";

export default function TablePage() {
  const { actions } = useActionStore();
  const [pagination, setPagination] = useState({ page: 1, size: 30 });
  const [filters, setFilters] = useState({});
  const [pageData, setPageData] = useState<TAdminList | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: pageData?.data || [],
    columns: pageConfig.columns,
    enableColumnPinning: true,
    initialState: { columnPinning: { right: ["actions"] } },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  async function getData() {
    setIsLoading(true);
    const result = await pageConfig.method.getRecord("", {
      ...pagination,
      ...filters,
    });
    if (result.success) {
      setPageData(result.data);
    } else {
      onTranslateBackendError(result.data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [pagination, actions, filters]);

  return (
    <motion.div
      initial={{ x: "-10vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ stiffness: 10, duration: 0.5 }}
      className="w-full  px-3 xl:px-5 mx-auto flex flex-col h-full justify-between space-y-4 xl:space-y-0"
    >
      <div className="space-y-2">
        <div className="w-full pt-5 flex items-center justify-between">
          <p className="text-lg xl:text-xl font-bold">
            {pageTitle} ({pageData?.count || 0})
          </p>
          <div className="flex items-center gap-x-2">
            <EditColumn table={table as ReturnType<typeof useReactTable>} />
            <PageFilter setFilters={setFilters} setPagination={setPagination} />
            <AddRecordButton />
          </div>
        </div>
      </div>
      <DataTable
        table={table as ReturnType<typeof useReactTable>}
        data={pageData?.data || []} // Ensure you are passing valid data
        isLoading={pageData ? false : true || isLoading}
      />

      <DataPagination
        pageData={pageData}
        pagination={pagination}
        setPagination={setPagination}
      />
    </motion.div>
  );
}

/**
 * CREATE RECORD BUTTON
 */
export function AddRecordButton() {
  const router = useRouter();
  const isXl = useMediaQuery({ query: "(min-width: 1280px)" });
  const pathname = usePathname();

  return (
    <Button
      size="xs"
      onClick={() => router.push(pathname + "/create")}
      className="text-xs xl:text-xs flex gap-x-0 items-center"
    >
      <Icon icon="ic:round-plus" className="mb-[2px]" />
      {isXl ? "Add Record" : null}
    </Button>
  );
}

interface EditColumnProps {
  table: ReturnType<typeof useReactTable>;
}

export function EditColumn({ table }: EditColumnProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="xs"
          onClick={() => setIsOpen(true)}
          className="ml-auto text-xs"
        >
          <Icon icon="tabler:columns" className="-mt-[1px]" />
          <p className="hidden xl:block">Edit Column</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onInteractOutside={() => setIsOpen(false)}
      >
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {/* @ts-ignore */}
              {column?.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * FILTER COMPONENT
 */
interface FilterDataProps {
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; size: number }>
  >;
}

export function PageFilter({ setFilters, setPagination }: FilterDataProps) {
  type TFilterFormSchema = z.infer<typeof filterFormConfig.schema>;

  const filterForm = useForm<TFilterFormSchema>({
    resolver: zodResolver(filterFormConfig.schema),
    defaultValues: filterFormConfig.defaultValues,
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
      field={filterFormConfig.field}
      form={filterForm}
      onFormSubmit={onFormSubmit}
    />
  );
}

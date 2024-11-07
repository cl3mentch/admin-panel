"use client";

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
import useGetEnum from "@/lib/hooks/useGetEnum";
import { useActionStore } from "@/lib/store/actionStore";
import { TUserList } from "@/lib/types/userType";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { filterFieldConfig } from "../config/filterSchema";
import { getRecord } from "../config/page-action";
import { PageFilter } from "../config/page-filter";
import { columns } from "../config/page-table-columns";

export default function TablePage() {
  // setup the enum list for filter when mounted
  useGetEnum(filterFieldConfig);

  const { actions } = useActionStore();
  const [pagination, setPagination] = useState({ page: 1, size: 20 });
  const [filters, setFilters] = useState({});
  const [pageData, setPageData] = useState<TUserList | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const table = useReactTable({
    data: pageData?.data || [],
    columns,
    enableColumnPinning: true,
    initialState: { columnPinning: { right: ["actions"] } },
    getCoreRowModel: getCoreRowModel(),
  });

  // Combined getData function that considers both pagination and filters
  async function getData() {
    setIsLoading(true);
    const result = await getRecord("", {
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
  }, [pagination, actions]);

  return (
    <motion.div
      initial={{ x: "-10vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ stiffness: 10, duration: 0.5 }}
      className="w-full px-3 xl:px-5 mx-auto flex flex-col h-full justify-between space-y-4 "
    >
      <div className="w-full pt-5 flex items-center justify-between">
        <p className="text-lg xl:text-2xl font-bold">
          User ({pageData?.count || 0})
        </p>
        <div className="flex items-center gap-x-2">
          <EditColumn table={table as ReturnType<typeof useReactTable>} />
          <PageFilter setFilters={setFilters} setPagination={setPagination} />
          <AddRecordButton />
        </div>
      </div>
      {pageData ? (
        <DataTable
          table={table as ReturnType<typeof useReactTable>}
          columns={columns}
          data={pageData?.data || []} // Ensure you are passing valid data
          isLoading={isLoading}
        />
      ) : (
        <div className="flex flex-col items-center justify-center m-auto h-[calc(80vh-220px)] md:h-[calc(106dvh-240px)] gap-y-5">
          <Icon
            icon="eos-icons:bubble-loading"
            className="text-[70px] m-auto text-black/50 dark:text-white/50"
          />
        </div>
      )}
      <DataPagination
        pageData={pageData}
        pagination={pagination}
        setPagination={setPagination}
      />
    </motion.div>
  );
}

// Updated AddRecordButton Component
export function AddRecordButton() {
  const router = useRouter();
  const isXl = useMediaQuery({ query: "(min-width: 1280px)" });

  return (
    <Button
      size="sm"
      onClick={() => router.push("/dashboard/user/list/create")}
      className="text-xs xl:text-sm flex gap-x-0 items-center"
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
          size="sm"
          onClick={() => setIsOpen(true)}
          className="ml-auto text-sm"
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
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

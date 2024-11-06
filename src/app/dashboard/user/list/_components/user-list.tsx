/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pageSizeOptions } from "@/constant/pagination";
import UserAPI from "@/lib/api/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/shared/table/data-table";
import { columns, TUserList } from "./tables/columns";
import Link from "next/link";

export default function UserlistPage() {
  const [pagination, setPagination] = useState({
    page: 1,
    size: 20,
  });
  const [pageData, setPageData] = useState<TUserList | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    setIsLoading(true);
    const result = await UserAPI.read(pagination.page, pagination.size);
    if (result.success) {
      setPageData(result.data); // This is now of type TUserList
    } else {
      toast.error(`Failed to fetch data`);
      setPageData(undefined); // Or handle error state appropriately
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [pagination]);

  return (
    <motion.div
      initial={{ x: "-10vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ stiffness: 50, duration: 0.4 }}
      className="w-full px-3 xl:px-5 mx-auto flex flex-col h-full justify-between space-y-4 "
    >
      <div className="w-full pt-5 flex items-center justify-between">
        <p className="text-lg xl:text-2xl font-bold">
          User ({pageData?.count || 0})
        </p>
        <Button size={"sm"}>
          <Link
            href={"/dashboard/user/list/new"}
            className="text-xs xl:text-sm flex gap-x-0 items-center"
          >
            <Icon icon="ic:round-plus" className="mb-[2px]" />
            Add Record
          </Link>
        </Button>
      </div>
      {pageData ? (
        <DataTable
          columns={columns}
          data={pageData.data}
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
      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-2 sm:flex-row">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-xs xl:text-sm text-foreground">
            {pageData && pageData?.count > 0 ? (
              <>
                Showing{" "}
                {Math.min(
                  pagination.page * pageData?.last_page,
                  pageData.count
                )}{" "}
                of {pageData.count} entries
              </>
            ) : (
              "No entries found"
            )}
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-xs xl:text-sm font-medium">
                Rows per page
              </p>
              <Select
                value={`${pagination.size}`}
                onValueChange={(value) => {
                  setPagination({ ...pagination, size: Number(value) });
                }}
              >
                <SelectTrigger className="h-8 w-[70px] bg-accent border-border text-xs xl:text-sm">
                  <SelectValue placeholder={pagination.size} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem
                      key={pageSize}
                      className="dark:text-white text-black text-xs xl:text-sm"
                      value={`${pageSize}`}
                    >
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex w-fit xl:w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex w-[150px] items-center justify-center text-xs xl:text-sm font-medium">
            {pageData && pageData?.count > 0 ? (
              <>
                Page {pagination.page} of {pageData?.last_page || 0}
              </>
            ) : (
              "No pages"
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="h-8 w-8 p-0 flex"
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: (prev.page = 1) }))
              }
              disabled={pagination.page === 1}
            >
              <Icon
                icon="material-symbols:double-arrow"
                className="h-4 w-4 text-black dark:text-white rotate-180"
              />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              disabled={pagination.page === 1}
            >
              <Icon
                icon="tabler:chevron-left"
                className="h-4 w-4 text-black dark:text-white"
              />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={pagination.page === pageData?.last_page}
            >
              <Icon
                icon="tabler:chevron-right"
                className="h-4 w-4 text-black dark:text-white"
              />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="h-8 w-8 p-0 flex"
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: (prev.page = Number(pageData?.last_page)),
                }))
              }
              disabled={pagination.page === pageData?.last_page}
            >
              <Icon
                icon="material-symbols:double-arrow"
                className="h-4 w-4 text-black dark:text-white"
              />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

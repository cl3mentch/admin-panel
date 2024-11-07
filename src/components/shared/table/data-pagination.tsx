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
import { Icon } from "@iconify/react/dist/iconify.js";

interface PaginationData {
  count: number;
  last_page: number;
}

interface PaginationProps<TPageData extends PaginationData> {
  pageData: TPageData | undefined;
  pagination: { page: number; size: number };
  setPagination: any;
}

export function DataPagination<TPageData extends PaginationData>({
  pageData,
  pagination,
  setPagination,
}: PaginationProps<TPageData>) {
  return (
    <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-2 sm:flex-row">
      <div className="flex w-full items-center justify-between">
        <div className="flex-1 text-xs xl:text-sm text-foreground">
          {pageData && pageData?.count > 0 ? (
            <>
              Showing{" "}
              {Math.min(pagination.page * pageData?.last_page, pageData.count)}{" "}
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
              setPagination((prev: any) => ({
                ...prev,
                page: (prev.page = 1),
              }))
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
              setPagination((prev: { page: number }) => ({
                ...prev,
                page: prev.page - 1,
              }))
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
              setPagination((prev: { page: number }) => ({
                ...prev,
                page: prev.page + 1,
              }))
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
              setPagination((prev: { page: number }) => ({
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
  );
}

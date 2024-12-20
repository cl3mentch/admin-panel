"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { copyToClipboard } from "@/lib/helper";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Column, flexRender, useReactTable } from "@tanstack/react-table";
import { CSSProperties } from "react";

interface DataTableProps<TData> {
  data: TData[];
  table: ReturnType<typeof useReactTable>;
  isLoading: boolean;
}
const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-1px 0 1px -1px gray inset"
      : isFirstRightPinnedColumn
      ? "1px 0 1px -1px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 10 : 0,
  };
};

export function DataTable<TData>({ isLoading, table }: DataTableProps<TData>) {
  return (
    <div className="h-[calc(100vh-200px)] overflow-x-auto rounded-md border w-full md:h-[calc(100dvh-230px)]">
      <Table>
        <TableHeader className="sticky top-0 z-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column } = header;
                return (
                  <TableHead
                    className="text-nowrap text-center bg-sidebar-accent"
                    key={header.id}
                    style={{ ...getCommonPinningStyles(column) }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        {isLoading ? (
          <Icon
            icon="eos-icons:bubble-loading"
            className="text-[30px] xl:text-[50px] m-auto text-black/50 dark:text-white/50 absolute left-[50%] translate-x-[-50%]  translate-y-[calc(50dvh-170px)]"
          />
        ) : table.getRowModel().rows?.length ? (
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const canCopyColumn = [
                    "web3_address",
                    "email",
                    "to_user",
                    "from_user",
                    "user",
                    "upline",
                  ];
                  const { column } = cell;
                  return (
                    <TableCell
                      className={`text-nowrap text-center ${
                        canCopyColumn.includes(column.id) ? "" : ""
                      }`}
                      key={cell.id}
                      style={{ ...getCommonPinningStyles(column) }}
                    >
                      <div className="flex items-center justify-center gap-x-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                        {/* Copy Button */}
                        {canCopyColumn.includes(column.id) && cell.getValue() ? (
                          <Icon
                            onClick={() =>
                              copyToClipboard(cell.getValue() as string)
                            }
                            icon="si:copy-alt-duotone"
                            width="13"
                            height="13"
                            className="cursor-pointer"
                          />
                        ) : null}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <p className="text-sm xl:text-xl m-auto text-black/50 dark:text-white/50 absolute left-[50%] translate-x-[-50%]  translate-y-[calc(50dvh-170px)]">
            No results.
          </p>
        )}
      </Table>
    </div>
  );
}

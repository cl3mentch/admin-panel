"use client";

import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CSSProperties } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    enableColumnPinning: true,
    initialState: { columnPinning: { right: ["actions"] } },
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="h-[calc(100vh-220px)] overflow-x-auto rounded-md border w-full md:h-[calc(106dvh-240px)]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column } = header;
                return (
                  <TableHead
                    className="text-nowrap text-center"
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
            className="text-[70px] m-auto text-black/50 dark:text-white/50 absolute left-[50%] translate-x-[-50%] translate-y-[25vh] "
          />
        ) : table.getRowModel().rows?.length ? (
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell;
                  return (
                    <TableCell
                      className="text-nowrap text-center"
                      key={cell.id}
                      style={{ ...getCommonPinningStyles(column) }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </Table>
    </div>
  );
}
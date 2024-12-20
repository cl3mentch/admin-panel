"use client";
import { Button } from "../ui/button";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMediaQuery } from "react-responsive";

interface DownloadExcelProps {
  fileName: string;
  fetchData: () => void;
  loading: boolean;
}

export function DownloadExcel({
  fileName,
  fetchData,
  loading,
}: DownloadExcelProps) {
  const isXl = useMediaQuery({ query: "(min-width: 1280px)" });

  const exportToExcel = async (fileName: string) => {
    const jsonData = (await fetchData()) as any;

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook and convert it to a Blob
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    // Save the Blob as a file
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <Button
      isLoading={loading}
      onClick={() => exportToExcel(fileName)}
      size={"xs"}
      className=" text-xs flex items-center gap-x-2"
    >
      <Icon icon="material-symbols:download" width="24" height="24" />
      {isXl ? "Export Excel" : null}
    </Button>
  );
}

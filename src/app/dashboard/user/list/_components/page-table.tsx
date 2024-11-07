/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DataPagination } from "@/components/shared/table/data-pagination";
import { DataTable } from "@/components/shared/table/data-table";
import { Button } from "@/components/ui/button";
import UserAPI from "@/lib/api/user";
import { TUserList } from "@/lib/types/userType";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { columns } from "./config/page-columns";
import { useActionStore } from "@/lib/store/actionStore";

export default function UserlistPage() {
  const router = useRouter();
  const { actions } = useActionStore();
  const [pagination, setPagination] = useState({
    page: 1,
    size: 20,
  });
  const [pageData, setPageData] = useState<TUserList | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    setIsLoading(true);
    const result = await UserAPI.read("", {
      ...pagination,
    });
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
        <Button
          size={"sm"}
          onClick={() => router.push("/dashboard/user/list/create")}
          className="text-xs xl:text-sm flex gap-x-0 items-center"
        >
          <Icon icon="ic:round-plus" className="mb-[2px]" />
          Add Record
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

      <DataPagination
        pageData={pageData}
        pagination={pagination}
        setPagination={setPagination}
      />
    </motion.div>
  );
}

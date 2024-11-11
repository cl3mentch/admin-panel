import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DeletePromp } from "./DeletePromp";
import { useState } from "react";

export type TActionOptions = "edit" | "delete" | "view" | "create";

export type TAction = {
  name: TActionOptions;
  path: string;
  icon: string;
  param: string;
}[];

interface ActionProps<TData extends Record<string, any>> {
  data: TData;
  actions: TAction;
  deleteRecord: (id: string) => void;
}

export default function DataAction<TData extends Record<string, any>>({
  data,
  actions,
  deleteRecord,
}: ActionProps<TData>) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4 text-black dark:text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-sm py-[2px]">
            Action ({data.id})
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {actions.map((option, i) => (
            <DropdownMenuItem key={i} className=" py-[2px]">
              {option.name !== "delete" ? (
                <Link
                  href={option.path + `?${option.param}=${data.id}`}
                  className="flex items-center gap-x-2 w-full capitalize"
                >
                  <Icon icon={option.icon} />
                  {option.name}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-x-2 w-full"
                  >
                    <Icon icon={option.icon} />
                    {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                  </button>
                </>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePromp
        id={data.id}
        showModal={showModal}
        setShowModal={setShowModal}
        deleteRecord={deleteRecord}
        actions={actions}
      />
    </>
  );
}

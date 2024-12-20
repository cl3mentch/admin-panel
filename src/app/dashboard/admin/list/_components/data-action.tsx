import { DeletePromp } from "@/components/shared/table/DeletePromp";
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
import { useState } from "react";

export type TActionOptions = "edit" | "delete" | "create" | any;

export type TAction = {
  name: TActionOptions;
  icon: string;
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
              <button
                onClick={() =>
                  option.name === "edit"
                    ? setShowEditModal(true)
                    : setShowDeleteModal(true)
                }
                className="flex items-center gap-x-2 w-full capitalize"
              >
                <Icon icon={option.icon} />
                {option.name}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal */}

      <DeletePromp
        id={data.id}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        deleteRecord={deleteRecord}
      />

    </>
  );
}

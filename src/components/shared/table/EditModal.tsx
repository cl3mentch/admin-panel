/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useActionStore } from "@/store/actionStore";
import { useRouter } from "nextjs-toploader/app";
import { usePathname } from "next/navigation";
import { TAction } from "@/lib/types/commonType";

interface IDeletePrompProps {
  id: string;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  deleteRecord: (id: string) => void;
  actions: Partial<TAction>;
}

export function DeletePromp({
  id,
  showModal,
  setShowModal,
  deleteRecord,
}: IDeletePrompProps) {
  const { setAction } = useActionStore();
  const router = useRouter();
  const pathname = usePathname();

  const onHandleDelete = async () => {
    deleteRecord(id);
    setShowModal(false);
    setTimeout(() => {
      // updates the action state to inform other component it has been updated
      setAction({ delete: true });

      // if im inside a slug then redirect back
      if (
        pathname.includes("/view") ||
        pathname.includes("/create") ||
        pathname.includes("/edit")
      ) {
        // remove the slug from the url
        const cleanedPathname = pathname.replace(/\/(view|create|edit)$/, "");
        router.push(cleanedPathname);
      }
    }, 1000);
  };

  return (
    <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription className="text-black/50 dark:text-white/50">
            Are you sure you want to delete Record ID {id} ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between ">
          <Button
            onClick={() => setShowModal(false)}
            variant="outline"
            className="text-black dark:text-white border-black/20 dark:border-white/20"
          >
            Cancel
          </Button>
          <Button
            onClick={onHandleDelete}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

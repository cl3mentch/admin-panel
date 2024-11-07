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

interface IDeletePrompProps {
  id: string;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export function DeletePromp({
  showModal,
  setShowModal,
  id,
}: IDeletePrompProps) {
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
          <Button className="bg-red-500 text-white hover:bg-red-600">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

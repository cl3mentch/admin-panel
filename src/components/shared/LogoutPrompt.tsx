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
import { useUserStore } from "@/lib/store/userDataStore";
import { config } from "@/lib/web3/wagmi/config";
import { disconnect } from "@wagmi/core";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { zeroAddress } from "viem";

export function LogoutPrompt({ showModal, setShowModal }: any) {
  const { setUser } = useUserStore();

  async function onLogout() {
    closeModal();
    // Disconnect from the application (assuming disconnect function exists)
    disconnect(config); // Make sure `config` is available, or import it if necessary
    Cookies.remove("accessToken"); // Remove the auth token from cookies
    setUser({ web3_address: zeroAddress, email: "" }); // Reset the user state
    redirect("/"); // Redirect to home or login page after logout
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription className="text-black/50 dark:text-white/50">
            Are you sure you want to log out? You will be redirected to the
            login.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between ">
          <Button
            variant="outline"
            className="text-black dark:text-white border-black/20 dark:border-white/20"
            onClick={() => setShowModal(false)} // Close the modal without logging out
          >
            Cancel
          </Button>
          <Button
            onClick={onLogout} // Call the logout function
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Log Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

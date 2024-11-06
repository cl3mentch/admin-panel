/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { truncateString } from "@/lib/helper";
import { useUserStore } from "@/lib/store/userDataStore";
import { config } from "@/lib/web3/wagmi/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { disconnect } from "@wagmi/core";
import Cookies from "js-cookie";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { zeroAddress } from "viem";
import { Language } from "../shared/Language";
import { Theme } from "../shared/Theme";
import { SidebarTrigger } from "../ui/sidebar";

export default function Navbar() {
  return (
    <nav className="w-full bg-card flex items-center justify-between px-3 py-2 gap-x-5 border-b border-border">
      <div className="flex items-center gap-x-3">
        <SidebarTrigger className="text-black dark:text-white" />
        <BreadcrumbComponent />
      </div>
      <div className="flex items-center gap-x-4">
        <Language />
        <Theme />
        <AvatarDropdown />
      </div>
    </nav>
  );
}

function BreadcrumbComponent() {
  const pathname = usePathname();
  const [crumbs, setCrumbs] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (pathname) {
      setCrumbs(pathname.split("/").splice(1)); // Split the pathname and remove the empty first part
    }
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs?.map((crumb, i) => (
          <React.Fragment key={i}>
            <BreadcrumbItem key={`breadcrumb-item-${i}`}>
              {i === 1 || crumbs.length - 1 === i ? (
                <p
                  className={`${
                    crumbs.length - 1 === i
                      ? "dark:text-white text-black"
                      : "dark:text-white/50 text-black/50"
                  } cursor-default`}
                >
                  {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                </p>
              ) : (
                <BreadcrumbLink
                  className={`dark:text-white/50 text-black/50 dark:hover:text-white text-sm`}
                  href={`/${crumb}`}
                >
                  {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {crumbs.length === i + 1 || crumbs.length === 1 ? null : (
              <BreadcrumbSeparator key={`separator-${i}`} />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function AvatarDropdown() {
  const { user } = useUserStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "q") {
        console.log(true);

        setShowModal(true);
      }

      if (e.altKey && e.key === "l") {
        console.log("log");
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <AvatarComponent />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-2 mr-2 w-[260px]">
          <DropdownMenuLabel className="flex items-center gap-x-3">
            <AvatarComponent />
            <div className="flex flex-col flex-wrap w-full text-wrap">
              <p>Welcome Back !</p>
              <p className="text-[12px] text-black/50 text-wrap dark:text-white/50 font-normal">
                {user?.web3_address !== zeroAddress
                  ? truncateString(user?.web3_address, 7, 7)
                  : user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="h-[2px]" />

          <DropdownMenuItem className="flex justify-between items-center py-2 px-3 cursor-pointer">
            <div className="flex items-center gap-x-2">
              <Icon icon="icon-park-outline:log" />
              Logbook
            </div>
            <div className="text-black/40 dark:text-white/50 text-[12px]">
              Alt + L
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowModal(true)}
            className="flex justify-between items-center py-2 px-3 cursor-pointer"
          >
            <div className="flex items-center gap-x-2">
              <Icon icon="material-symbols:logout" />
              Logout
            </div>
            <div className="text-black/40 dark:text-white/50 text-[12px]">
              Alt + Q
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutPrompt showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

function AvatarComponent() {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
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
            homepage.
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

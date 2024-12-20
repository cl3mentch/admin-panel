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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { truncateString } from "@/lib/helper";
import { useUserStore } from "@/store/userDataStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { zeroAddress } from "viem";
import { Language } from "../shared/Language";
import { LogoutPrompt } from "../shared/LogoutPrompt";
import { Theme } from "../shared/Theme";
import { SidebarTrigger } from "../ui/sidebar";

export default function Navbar() {
  return (
    <nav className="w-full bg-card flex items-center justify-between px-3 py-2 gap-x-5 border-b border-border">
      <div className="flex items-center gap-x-1 xl:gap-x-3">
        <SidebarTrigger className="text-black dark:text-white" />
        <BreadcrumbComponent />
      </div>
      <div className="flex items-center gap-x-1">
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
  const isXl = useMediaQuery({ query: "(min-width: 1280px)" });

  useEffect(() => {
    if (pathname) {
      setCrumbs(pathname.split("/").splice(1)); // Split the pathname and remove the empty first part
    }
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs?.map((crumb, i) => {
          // Join the crumbs progressively
          const linkPath = `/${crumbs?.slice(0, i + 1).join("/")}`;

          return (
            <React.Fragment key={i}>
              {!isXl && i === 1 ? null : (
                <>
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
                        href={linkPath}
                      >
                        {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {crumbs.length === i + 1 || crumbs.length === 1 ? null : (
                    <BreadcrumbSeparator key={`separator-${i}`} />
                  )}
                </>
              )}
            </React.Fragment>
          );
        })}
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <AvatarComponent />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-2 mr-2 w-[260px]">
          <DropdownMenuLabel className="flex items-center gap-x-3">
            <AvatarComponent />
            <div className="flex flex-col flex-wrap w-full truncate">
              <p>Welcome Back !</p>
              <span className="w-full text-[12px] text-black dark:text-white font-normal text-ellipsis overflow-hidden ">
                {user?.web3_address !== zeroAddress
                  ? truncateString(user?.web3_address, 7, 7)
                  : user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

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
    </div>
  );
}

function AvatarComponent() {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src="/img/profile.gif" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

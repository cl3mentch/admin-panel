/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
import { useUserStore } from "@/lib/store/userDataStore";
import { config } from "@/lib/web3/wagmi/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { disconnect } from "@wagmi/core";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { zeroAddress } from "viem";
import { Language } from "../shared/Language";
import { Theme } from "../shared/Theme";
import { SidebarTrigger } from "../ui/sidebar";

export default function Navbar() {
  return (
    <nav className="w-full bg-card flex items-center justify-between px-3 py-2 gap-x-5 border-b border-l border-border">
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
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-sm" href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="text-sm" href="/components">
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-sm">Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function AvatarDropdown() {
  const { user, setUser } = useUserStore();

  async function onLogout() {
    disconnect(config);
    Cookies.remove("accessToken");
    setUser({ web3_address: zeroAddress });
    redirect("/");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <AvatarComponent />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 mr-2 w-[250px]">
        <DropdownMenuLabel className="flex items-center gap-x-3">
          <AvatarComponent />
          <div>
            <p>Username</p>
            <p className="text-sm text-black/50 dark:text-white/50 font-normal">
              {truncateString(zeroAddress, 5, 4)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-2 py-2 px-3">
          <Icon icon="icon-park-outline:log" />
          Log
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="flex items-center gap-x-2 py-2 px-3"
        >
          <Icon icon="material-symbols:logout" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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

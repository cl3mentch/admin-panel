"use client";

import { directory, DirectoryItem } from "@/constant/directory"; // Import type
import { Icon } from "@iconify/react/dist/iconify.js";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { truncateString } from "@/lib/helper";
import { useUserStore } from "@/store/userDataStore";
import { ChevronsUpDown, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { zeroAddress } from "viem";
import { LogoutPrompt } from "../shared/LogoutPrompt";

// Typing the props for CollapsibleComponent
type CollapsibleProps = {
  dir: DirectoryItem; // Each item in the directory
  pathname: string;
};

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="overflow-hidden">
        <SidebarHeader>
          <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Icon icon="tabler:brand-nextjs" className="text-[30px]" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Admin Panel</span>
              <span className="truncate text-xs">Skywalker Technology</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="h-full gap-y-1">
          <SidebarGroup>
            <SidebarGroupLabel className="ml-[1px] text-[12px]">
              Overview
            </SidebarGroupLabel>

            <SidebarMenu>
              {directory.map((dir) => {
                const key = dir.title; // Or use another unique value (e.g., dir.path)

                return dir.children && dir.children.length > 0 ? (
                  <CollapsibleComponent
                    key={key} // Use key for the collapsible component
                    dir={dir}
                    pathname={pathname}
                  />
                ) : (
                  <NonColapsibleComp
                    key={key} // Use key for the non-collapsible component
                    dir={dir}
                    pathname={pathname}
                  />
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarFooterContent />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
      {children}
    </SidebarProvider>
  );
}

export function NonColapsibleComp({ dir, pathname }: CollapsibleProps) {
  const isActive = pathname === dir.path;
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={dir.title}
        isActive={isActive}
        onClick={() => setOpenMobile(false)}
        className="py-5"
      >
        <Link href={dir.path}>
          <Icon
            icon={dir.icon ? dir.icon : "mdi:apple-keyboard-command"}
            className={`${isActive ? "text-primary dark:text-white" : ""}`} // Apply color for active state
          />
          <span className={`${isActive ? "text-primary dark:text-white" : ""}`}>
            {dir.title}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function CollapsibleComponent({ dir, pathname }: CollapsibleProps) {
  const isParentActive =
    pathname.split("?")[0] === dir.path ||
    dir.children.some((child) => {
      const cleanedPathname = pathname.replace(/\/(view|create|edit)$/, "");
      return cleanedPathname === child.path;
    });

  const { setOpenMobile } = useSidebar();
  return (
    <Collapsible
      key={dir.title}
      asChild
      defaultOpen={isParentActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={dir.title} className="py-5">
            <Icon
              icon={dir.icon ? dir.icon : "mdi:apple-keyboard-command"}
              className={`w-10 h-10 `}
            />
            <span>{dir.title}</span>
            <div className="ml-auto">
              <Icon
                icon="mynaui:chevron-right"
                className={` w-5 h-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90`}
              />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {dir.children?.map((child) => {
              const cleanedPathname = pathname.replace(
                /\/(view|create|edit)$/,
                ""
              );
              const isChildActive = cleanedPathname === child.path;
              return (
                <SidebarMenuSubItem key={child.title}>
                  <SidebarMenuSubButton
                    asChild
                    onClick={() => setOpenMobile(false)}
                    isActive={isChildActive} // Mark child as active if the path matches
                    className="py-4"
                  >
                    <Link href={child.path}>
                      <span
                        className={`flex items-center gap-x-2 ${
                          isChildActive ? "text-primary dark:text-white" : ""
                        }`}
                      >
                        <Icon
                          icon={
                            child.icon
                              ? child.icon
                              : "mdi:apple-keyboard-command"
                          }
                          className="w-4 h-4 -mt-[1px]"
                        />
                        {child.title}
                      </span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function SidebarFooterContent() {
  const { user } = useUserStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={"/img/profile.avif"} alt={"profile"} />
                  <AvatarFallback className="rounded-lg">{"AD"}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin</span>
                  <span className="truncate text-xs">
                    {user?.web3_address !== zeroAddress
                      ? truncateString(user?.web3_address, 8, 8)
                      : user?.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg "
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={"/img/profile.avif"} alt={"profile"} />
                    <AvatarFallback className="rounded-lg">
                      {"CN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Admin</span>
                    <span className="truncate text-xs">
                      {user?.web3_address !== zeroAddress
                        ? truncateString(user?.web3_address, 7, 7)
                        : user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
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
                  className="justify-between"
                >
                  <div className="flex items-center gap-x-2">
                    <LogOut />
                    Log out
                  </div>
                  <div className="text-black/40 dark:text-white/50 text-[12px]">
                    Alt + Q
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <LogoutPrompt showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

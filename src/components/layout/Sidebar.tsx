"use client";

import { directory, DirectoryItem } from "@/constant/directory"; // Import type
import { Icon } from "@iconify/react/dist/iconify.js";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// Typing the props for CollapsibleComponent
type CollapsibleProps = {
  dir: DirectoryItem; // Each item in the directory
  pathname: string;
};

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="">
      <SidebarHeader>
        <div className="flex items-center gap-x-2 py-1 px-3">
          <Icon icon="tabler:brand-nextjs" className="text-[30px]" />
          <p className="font-semibold text-xl">Logo</p>
        </div>
      </SidebarHeader>

      <SidebarContent className=" h-full gap-y-1">
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

      <SidebarFooter />
    </Sidebar>
  );
}

export function NonColapsibleComp({ dir, pathname }: CollapsibleProps) {
  const isActive = pathname === dir.path;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={dir.title} isActive={isActive}>
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
    pathname === dir.path ||
    dir.children.some((child) => pathname === child.path);

  return (
    <Collapsible
      key={dir.title}
      asChild
      defaultOpen={isParentActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={dir.title}>
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
              const isChildActive = pathname === child.path;
              return (
                <SidebarMenuSubItem key={child.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isChildActive} // Mark child as active if the path matches
                  >
                    <Link href={child.path}>
                      <span
                        className={`${
                          isChildActive ? "text-primary dark:text-white" : ""
                        }`}
                      >
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

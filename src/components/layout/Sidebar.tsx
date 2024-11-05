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

// Typing the props for CollapsibleComponent
type CollapsibleProps = {
  dir: DirectoryItem; // Each item in the directory
  pathname: string;
};

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
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
            {directory.map((dir) =>
              dir.children && dir.children.length > 0 ? (
                <CollapsibleComponent dir={dir} pathname={pathname} />
              ) : (
                <NonColapsibleComp dir={dir} pathname={pathname} />
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

function NonColapsibleComp({ dir, pathname }: CollapsibleProps) {
  return (
    <SidebarMenuItem key={dir.title}>
      <SidebarMenuButton
        asChild
        tooltip={dir.title}
        isActive={pathname === dir.path}
      >
        <Link href={dir.path}>
          <Icon icon={dir.icon ? dir.icon : "mdi:apple-keyboard-command"} />
          <span>{dir.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function CollapsibleComponent({ dir, pathname }: CollapsibleProps) {
  return (
    <Collapsible
      key={dir.title}
      asChild
      defaultOpen={dir.children.some((child) => child.path === pathname)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={dir.title}
            isActive={pathname === dir.path}
          >
            <Icon
              icon={dir.icon ? dir.icon : "mdi:apple-keyboard-command"}
              className="w-10 h-10"
            />
            <span>{dir.title}</span>
            <div className="ml-auto">
              <Icon
                icon="mynaui:chevron-right"
                className=" w-5 h-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {dir.children?.map((child) => (
              <SidebarMenuSubItem key={child.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={pathname === child.path}
                >
                  <Link href={child.path}>
                    <span>{child.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

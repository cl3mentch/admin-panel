import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className=" flex items-center gap-x-2 py-1 px-3">
          <Icon icon="tabler:brand-nextjs" className=" text-[30px]" />
          <p className="font-semibold text-xl ">Logo</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-1 px-3 h-full ">
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

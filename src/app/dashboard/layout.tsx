import type { Metadata } from "next";
import "../globals.css";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Navbar from "@/components/layout/Navbar";
import { AppSidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard: Overview",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-transparent h-full">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import { AppSidebar } from "@/components/layout/Sidebar";
import type { Metadata } from "next";
import "../globals.css";

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
    <AppSidebar>
      <main className="w-full bg-card min-h-screen overflow-hidden ">
        <Navbar />
        <div className="xl:pb-0 pb-[80px]">{children}</div>
      </main>
    </AppSidebar>
  );
}

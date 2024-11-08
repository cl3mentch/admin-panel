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
      <main className="w-full bg-card min-h-screen overflow-hidden relative flex flex-col">
        <Navbar />
        <div className="xl:pb-5 pb-[80px] flex flex-col items-center flex-1">
          {children}
        </div>
      </main>
    </AppSidebar>
  );
}

import Toaster from "@/components/shared/Toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import AllProviders from "./provider";
import NextTopLoader from "nextjs-toploader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          " min-h-screen relative font-sans antialiased transition bg-background",
          fontSans.variable
        )}
      >
        <AllProviders>
          <NextTopLoader />
          <Toaster />
          {children}
        </AllProviders>
      </body>
    </html>
  );
}

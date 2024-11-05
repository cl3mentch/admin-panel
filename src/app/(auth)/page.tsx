/* eslint-disable @next/next/no-img-element */
"use client";

import { LeftSide } from "@/components/page/auth/LeftSide";
import { RightSide } from "@/components/page/auth/RightSide";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (token) {
      redirect("/dashboard");
    }
  }, [token]);

  return (
    <main className="min-h-screen relative w-full bg-background flex">
      <LeftSide />
      <RightSide />
    </main>
  );
}

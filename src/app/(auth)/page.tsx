/* eslint-disable @next/next/no-img-element */
"use client";

import { LeftSide } from "@/components/page/auth/LeftSide";
import { RightSide } from "@/components/page/auth/RightSide";

export default function Auth() {
  return (
    <main className="min-h-screen relative w-full bg-background flex">
      <LeftSide />
      <RightSide />
    </main>
  );
}

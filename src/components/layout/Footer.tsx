/* eslint-disable @next/next/no-img-element */
"use client";

import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <div className="relative  z-20 flex w-full flex-col">
      <img
        src={"/img/footer/mobileParty.png"}
        alt=""
        className="block w-full md:hidden"
      />
      <img
        src={"/img/footer/desktopParty.png"}
        alt=""
        className="hidden w-full md:block"
      />
      <div className="flex w-full flex-col-reverse items-center justify-between gap-y-3 bg-[#2D0B31] px-8 py-5 xl:flex-row xl:gap-y-0">
        <p className="text-center text-[12px] xl:text-left xl:text-md">
          Copyright © 2024 Chain Party All Rights Reserved.
        </p>
        <div className="flex items-center gap-x-3">
          <a href="https://x.com/ChainPartyXYZ" className="">
            <div className="defaultButtonBg relative rounded-full p-[1px]">
              <div className="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition">
                <img src="/img/footer/twitter.png" className="" alt="" />
              </div>
            </div>
          </a>
          <a href="https://t.me/ChainPartyXYZ" className="">
            <div className="defaultButtonBg relative rounded-full p-[1px]">
              <div className="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition">
                <img src="/img/footer/telegram.png" className="" alt="" />
              </div>
            </div>
          </a>
          <a href="https://www.youtube.com/@ChainPartyXYZ" className="">
            <div className="defaultButtonBg relative rounded-full p-[1px]">
              <div className="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition">
                <img src="/img/footer/youtube.png" className="" alt="" />
              </div>
            </div>
          </a>
          <a
            href="https://www.instagram.com/chainpartyxyz/?igsh=MWVqcnM4MHRueDN3Ng%3D%3D"
            className=""
          >
            <div className="defaultButtonBg relative rounded-full p-[1px]">
              <div className="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition">
                <Icon icon="mdi:instagram" className="text-xl" />
              </div>
            </div>
          </a>
          <a href="https://docs.chainparty.xyz/" className="">
            <div className="defaultButtonBg relative rounded-full p-[1px]">
              <div className="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition">
                <Icon icon="simple-icons:gitbook" className="text-xl" />
              </div>
            </div>
          </a>
          <a href="https://linktr.ee/ChainPartyXYZ" className="">
            <div className="defaultButtonBg relative rounded-full p-[1px]">
              <div className="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition">
                <Icon icon="simple-icons:linktree" className="text-xl" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

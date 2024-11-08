import { ConnectWallet } from "@/components/shared/ConnectWallet";
import { Language } from "@/components/shared/Language";
import { Theme } from "@/components/shared/Theme";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EmailLogin } from "./EmailLogin";

export function RightSide() {
  return (
    <div className="z-10 bg-card w-full xl:w-[35%] min-h-screen flex flex-col px-5 xl:px-10 py-5 ">
      <div className="flex justify-between w-full xl:justify-end">
        <div className="flex xl:hidden items-center gap-x-2 ">
          <Icon icon="tabler:brand-nextjs" className=" text-4xl" />
        </div>

        <div className="bg-accent rounded-full px-2 py-1 flex gap-x-3">
          <Language />
          <Theme />
        </div>
      </div>

      <div className="space-y-5 m-auto w-full">
        <div>
          <p className="text-3xl xl:text-4xl font-bold ">Welcome Back 👻</p>
          <p className="text-sm text-foreground dark:text-muted/60">
            Enter your account details to manage your project
          </p>
        </div>
        
        <EmailLogin />

        <div className="flex items-center gap-x-2">
          <div className="w-full bg-black/20 dark:bg-white/30 h-[1px]"></div>
          <p className="text-black/50 dark:text-white/50 text-[12px] text-nowrap font-thin">
            OR CONTINUE WITH
          </p>
          <div className="w-full bg-black/20 dark:bg-white/30 h-[1px]"></div>
        </div>

        <ConnectWallet />
      </div>

      <p className="sticky bottom-0 text-center text-[12px] text-white/50">
        Copyright © 2024 Skywalker Technology
      </p>
    </div>
  );
}
